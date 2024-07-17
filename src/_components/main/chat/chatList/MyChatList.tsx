'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import Image from 'next/image';

// styles
import cx from 'classnames';
import styles from './chatlist.module.scss';

// api
import { getMyChats } from '@/pages/api/chat/useGetMyChats';

// types
import { Chat } from '@/src/types/aboutChat';

// atom
import { useRecoilState } from 'recoil';
import { selectedChatState } from '@/src/atom/stats';

const MyChatList = () => {
  const [cookies] = useCookies(['token']);
  const { token } = cookies;

  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);

  const handleSelectedChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const {
    data: chats = [],
    error,
    isLoading,
  } = useQuery<Chat[], Error>({
    queryKey: ['myChats'],
    queryFn: () => getMyChats(token),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.chats}>
      {chats.map((chat, index) => (
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
      ))}
    </div>
  );
};

export default MyChatList;
