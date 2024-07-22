'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { QueryObserverResult } from '@tanstack/react-query';

// styles
import cx from 'classnames';
import styles from './chatlist.module.scss';

// types
import { Chat } from '@/src/types/aboutChat';

// atom
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedChatState, searchState } from '@/src/atom/stats';

// components
import Modal from '@/src/_components/Common/Modal';
import EnterChat from '../../modal/chat/EnterChat';

// icons
import { FaRegFaceSadCry } from 'react-icons/fa6';

// hooks
import useToggle from '@/src/hooks/Home/useToggle';

// api
import axios from 'axios';
import { getChatRoomList, joinChatRoom } from '@/pages/api/chat';

interface EntireChatListProps {
  mainQuery: QueryObserverResult<Chat[], Error>;
  myChatQuery: QueryObserverResult<Chat[], Error>;
  refetchChatList: () => void;
}

const EntireChatList: React.FC<EntireChatListProps> = ({
  mainQuery,
  myChatQuery,
  refetchChatList,
}) => {
  const { data: myChats = [] } = myChatQuery;
  const { data: mainChats = [], error, isLoading } = mainQuery;

  const scrollRef = useRef<HTMLDivElement>(null);

  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const [selectedRoomId, setSelectedRoomId] = useState<number>(0);
  const search = useRecoilValue(searchState);

  const [chats, setChats] = useState<Chat[]>([]);
  const chatsRef = useRef<Chat[]>([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    if (mainChats.length && mainChats !== chatsRef.current) {
      setChats(mainChats);
      chatsRef.current = mainChats;
    }
    console.log('chats : ', chatsRef.current);
  }, [mainChats]);

  // 채팅방 입장 모달
  const [modal, setModal] = useState<boolean>(false);
  const openModal = useToggle(modal, setModal);

  const handleSelectedChat = (chat: Chat) => {
    if (isInMyChats(chat.roomId)) {
      setSelectedChat(chat);
    }
  };

  const isInMyChats = (chatId: number) => {
    return myChats.some((chat) => chat.roomId === chatId);
  };

  const onClickEnterBtn = (roomId: number) => {
    setSelectedRoomId(roomId);
    openModal();
  };

  const handleEnterChat = async (data: { roomId: number }) => {
    const { roomId } = data;
    try {
      await joinChatRoom(roomId);
      refetchChatList();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const fetchMoreChats = useCallback(async () => {
    if (fetchLoading || chatsRef.current.length === 0 || !hasMore) return;
    setFetchLoading(true);

    const params = {
      roomId: chatsRef.current[chatsRef.current.length - 1].roomId,
      createdAt: chatsRef.current[chatsRef.current.length - 1].createAt,
    };

    try {
      console.log('params: ', params);
      const [data] = await Promise.all([
        getChatRoomList(params),
        new Promise((resolve) => setTimeout(resolve, 1000)), // 최소 1초 지연
      ]);

      if (data.length > 0) {
        const newChats: Chat[] = data;
        setChats((prevChats) => [...prevChats, ...newChats]);
        chatsRef.current = [...chatsRef.current, ...newChats];
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more chats:', error);
    } finally {
      setFetchLoading(false);
    }
  }, [fetchLoading, hasMore]);

  useEffect(() => {
    let isMounted = true;
    const currentScrollRef = scrollRef.current;

    const handleScroll = () => {
      if (currentScrollRef) {
        const { scrollTop, scrollHeight, clientHeight } = currentScrollRef;
        if (scrollTop + clientHeight >= scrollHeight - 1) {
          if (isMounted && !fetchLoading && hasMore && !search) {
            fetchMoreChats();
          }
        }
      }
    };

    if (currentScrollRef) {
      currentScrollRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener('scroll', handleScroll);
      }
      isMounted = false;
    };
  }, [fetchLoading, hasMore, fetchMoreChats, search]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <span className={styles.loader}></span>
      </div>
    );
  }

  if (error)
    return (
      <div className={styles.container}>
        <div className={styles.error}>Error</div>
        <div className={styles.errorMsg}>{error.message}</div>
      </div>
    );

  return (
    <div className={styles.chats} ref={scrollRef}>
      {chats.length > 0 ? (
        chats.map((chat, index) => (
          <div
            key={index}
            className={cx(styles.chat, {
              [styles.active]: selectedChat?.roomId === chat.roomId,
            })}
            onClick={() => handleSelectedChat(chat)}
          >
            <div className={styles.imageContainer}>
              <div className={styles.imageSize}>
                <Image
                  src={`/region/${chat.regionName}.png`}
                  alt={`${chat.regionName}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className={styles.region}>{chat.regionName}</div>
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.titleContainer}>
                <div className={styles.title}>{chat.title}</div>
                <span className={styles.count}>{chat.participantCount}</span>
              </div>
              <div className={styles.overview}>
                {chat.tags.map((tag, index) => (
                  <div
                    key={index}
                    className={styles.hashtag}
                    style={{ backgroundColor: `#${tag.color}` }}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            </div>
            {!isInMyChats(chat.roomId) && (
              <div
                className={styles.enterBtn}
                onClick={() => onClickEnterBtn(chat.roomId)}
              >
                입장
              </div>
            )}
          </div>
        ))
      ) : search ? (
        <div className={styles.noChat}>
          <FaRegFaceSadCry />
          <br />
          검색 결과가 없습니다.
        </div>
      ) : (
        <div className={styles.noChat}>
          <FaRegFaceSadCry />
          <br />
          생성된 채팅방이 없습니다.
          <br />
          채팅방을 만들어보세요 !
        </div>
      )}
      {fetchLoading && (
        <div className={styles.container}>
          <span className={styles.loader}></span>
        </div>
      )}
      <Modal openModal={openModal} modal={modal} width="20rem" height="15rem">
        <EnterChat
          openModal={openModal}
          roomId={selectedRoomId}
          onEnterChat={handleEnterChat}
        />
      </Modal>
    </div>
  );
};

export default EntireChatList;
