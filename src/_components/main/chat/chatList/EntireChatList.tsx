'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { QueryObserverResult } from '@tanstack/react-query';

// styles
import cx from 'classnames';
import styles from './chatlist.module.scss';

// types
import { Chat } from '@/src/types/aboutChat';

// atom
import { useRecoilState } from 'recoil';
import { selectedChatState } from '@/src/atom/stats';

// components
import Modal from '@/src/_components/Common/Modal';
import EnterChat from '../../modal/chat/EnterChat';

// icons
import { FaRegFaceSadCry } from 'react-icons/fa6';

// hooks
import useToggle from '@/src/hooks/Home/useToggle';

// api
import axios from 'axios';
import { joinChatRoom } from '@/pages/api/chat';

interface EntireChatListProps {
  mainQuery: QueryObserverResult<Chat[], Error>;
  myChatQuery: QueryObserverResult<Chat[], Error>;
  refetchChatList: () => void;
  searchState: boolean;
}

const EntireChatList: React.FC<EntireChatListProps> = ({
  mainQuery,
  myChatQuery,
  refetchChatList,
  searchState,
}) => {
  const { data: myChats = [] } = myChatQuery;
  const { data: chats = [], error, isLoading } = mainQuery;
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);

  // 채팅방 입장 모달
  const [modal, setModal] = useState<boolean>(false);
  const openModal = useToggle(modal, setModal);

  const [selectedRoomId, setSelectedRoomId] = useState<number>(0);

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
      const response = await joinChatRoom(roomId);
      refetchChatList();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <span className={styles.loader}></span>
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.chats}>
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
                  src={'/region/경상남도.png'}
                  alt={`${chat.regionName}`}
                  layout="fill"
                  objectFit="contain"
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
      ) : searchState ? (
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
