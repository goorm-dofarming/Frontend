'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// styles
import cx from 'classnames';
import styles from './chatlist.module.scss';

// types
import { Chat } from '@/src/types/aboutChat';

// atom
import { useRecoilState } from 'recoil';
import { selectedChatState } from '@/src/atom/stats';

// icons
import { FaRegFaceSadCry } from 'react-icons/fa6';

interface EntireChatChatProps {
  chats: Chat[];
  myChats: Chat[];
  isLoading: boolean;
  error: Error | null;
}

const EntireChatList: React.FC<EntireChatChatProps> = ({
  chats,
  myChats,
  isLoading,
  error,
}) => {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);

  const handleSelectedChat = (chat: Chat) => {
    if (isInMyChats(chat.roomId)) {
      setSelectedChat(chat);
    }
  };

  const isInMyChats = (chatId: number) => {
    return myChats.some((chat) => chat.roomId === chatId);
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
              <div className={styles.enterBtn}>입장</div>
            )}
          </div>
        ))
      ) : (
        <div className={styles.noChat}>
          <FaRegFaceSadCry />
          <br />
          생성된 채팅방이 없습니다.
          <br />
          채팅방을 만들어보세요 !
        </div>
      )}
    </div>
  );
};

export default EntireChatList;
