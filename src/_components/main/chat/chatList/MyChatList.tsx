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

interface MyChatListProps {
  chats: Chat[];
  isLoading: boolean;
  error: Error | null;
}

const MyChatList: React.FC<MyChatListProps> = ({ chats, isLoading, error }) => {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);

  const handleSelectedChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

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
