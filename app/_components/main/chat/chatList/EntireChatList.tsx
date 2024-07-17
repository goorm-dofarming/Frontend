'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import Image from 'next/image';

// styles
import cx from 'classnames';
import styles from './chatlist.module.scss';

// api
import { getMyChats } from '@/app/api/chat/useGetMyChats';
import { getEntireChats } from '@/app/api/chat/useGetEntireChats';

// types
import { Chat } from '@/app/types/aboutChat';

// atom
import { useRecoilState } from 'recoil';
import { selectedChatState } from '@/app/atom/stats';

const EntireChatList = () => {
  const [cookies] = useCookies(['token']);
  const { token } = cookies;

  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);

  const handleSelectedChat = (chat: Chat) => {
    if (isInMyChats(chat.roomId)) {
      setSelectedChat(chat);
    }
  };

  const { data: myChats = [] } = useQuery<Chat[], Error>({
    queryKey: ['myChats'],
    queryFn: () => getMyChats(token),
  });

  const {
    data: entireChats = [],
    error,
    isLoading,
  } = useQuery<Chat[], Error>({
    queryKey: ['entireChats'],
    queryFn: getEntireChats,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) return <div>Error: {error.message}</div>;

  const isInMyChats = (chatId: number) => {
    return myChats.some((chat) => chat.roomId === chatId);
  };

  return (
    <div className={styles.chats}>
      {entireChats.map((chat, index) => (
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
      ))}
    </div>
  );
};

export default EntireChatList;
