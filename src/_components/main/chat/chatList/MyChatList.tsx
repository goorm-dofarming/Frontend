import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { QueryObserverResult } from '@tanstack/react-query';

// styles
import cx from 'classnames';
import styles from './chatlist.module.scss';

// types
import { Chat } from '@/src/types/aboutChat';

// atom
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchState, selectedChatState } from '@/src/atom/stats';

// icons
import { FaRegFaceSadCry } from 'react-icons/fa6';
import ChatLoader from '@/src/_components/Common/ChatLoader';

interface MyChatListProps {
  myChatQuery: QueryObserverResult<Chat[], Error>;
  searchQuery: QueryObserverResult<Chat[], Error>;
}

const MyChatList: React.FC<MyChatListProps> = ({
  myChatQuery,
  searchQuery,
}) => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const search = useRecoilValue(searchState);

  const { data: myChats = [] } = myChatQuery;
  const { data: srhChats = [] } = searchQuery;

  useEffect(() => {
    if (search) {
      setError(searchQuery.error);
      setLoading(searchQuery.isLoading);
    } else {
      setError(myChatQuery.error);
      setLoading(myChatQuery.isLoading);
    }
  }, [search, searchQuery, myChatQuery]);

  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);

  const handleSelectedChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const isInMyChats = (chatId: number) => {
    return myChats.some((chat) => chat.roomId === chatId);
  };

  const chats = search
    ? srhChats.filter((srhChat) => isInMyChats(srhChat.roomId))
    : myChats;

  if (loading) {
    return (
      <div className={styles.container}>
        <ChatLoader />
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
                {(chat.tags ?? []).map((tag, index) => (
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
            <div className={styles.chatBadge}>300+</div>
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
          아직 채팅에 참여를 안하셨군요 !
          <br />
          <br />
          채팅을 만들거나,
          <br />
          오픈 채팅에서 다른 채팅에 입장해보세요 !
        </div>
      )}
    </div>
  );
};

export default MyChatList;
