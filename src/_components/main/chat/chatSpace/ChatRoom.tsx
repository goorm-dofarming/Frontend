'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { QueryObserverResult } from '@tanstack/react-query';

// styles
import cx from 'classnames';
import styles from './chatspace.module.scss';

// icon
import Profile from '@/src/_assets/main/defaultProfile.svg';

// atom
import { useRecoilState } from 'recoil';
import { selectedChatState, userState } from '@/src/atom/stats';

// types
import { Message } from '@/src/types/aboutChat';

// api
import axios from 'axios';
import { getUser } from '@/pages/api/user';
import Landing from '@/src/_components/Common/Landing';

const ChatRoom: React.FC<{
  messageQuery: QueryObserverResult<Message[], Error>;
  unreadMessageCount: number;
}> = ({ messageQuery, unreadMessageCount }) => {
  const { data: messages = [], error, isLoading } = messageQuery;
  const [user] = useRecoilState(userState);
  const [usersImage, setUsersImage] = useState<{
    [key: number]: string | null;
  }>({});
  const prevDateRef = useRef<Date | null>(null);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);

  const containerRef = useRef<HTMLDivElement>(null);
  const [moveScroll, setMoveScroll] = useState<boolean>(true);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (unreadMessageCount > 0) {
      setMoveScroll(true);
      // console.log('scroll true');
    }
  }, [unreadMessageCount]);

  useEffect(() => {
    setTimeout(() => {
      if (targetRef.current && containerRef.current && moveScroll) {
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
        // console.log('이동');
      }
    }, 200);
  }, [selectedChat, moveScroll]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && containerRef.current.scrollTop === 0) {
        setMoveScroll(false);
        // console.log('scroll false');
      }
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const getImageUrl = (url: string | null) => {
    if (url && !url.startsWith('http') && !url.startsWith('https')) {
      return `${process.env.NEXT_PUBLIC_DEPLOY_PROFILE_IMAGE_ADDRESS}/${url}`;
    }
    return url;
  };

  const setDateHour = (data: string) => {
    const date = new Date(data);
    date.setHours(date.getHours() + 9);
    return date.toString();
  };

  const getDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());

    return `${year}년 ${month}월 ${day}일`;
  };

  const getHour = (data: string) => {
    const date = new Date(data);
    date.setHours(date.getHours() + 9);

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const period = hours < 12 ? '오전' : '오후';
    const displayHours = hours % 12 || 12;
    return `${period} ${displayHours}시 ${minutes}분`;
  };

  const getUsersImage = async (userId: number) => {
    if (usersImage[userId] === undefined) {
      try {
        const data = await getUser(userId);
        const image = data.imageUrl;
        setUsersImage((prevImages) => ({
          ...prevImages,
          [userId]: image,
        }));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    }
  };

  useEffect(() => {
    messages.forEach((message) => {
      if (
        message.messageType === 'SEND' &&
        usersImage[message.userId] === undefined
      ) {
        getUsersImage(message.userId);
      }
    });
    prevDateRef.current = null;
  }, [messages]);

  if (isLoading) {
    return <Landing />;
  }

  return (
    <div className={styles.chatRoom} ref={containerRef}>
      {messages.length > 0 &&
        user &&
        messages.map((message, index) => {
          const messageDate = new Date(setDateHour(message.createdAt));
          const prevMessageDate =
            index > 0
              ? new Date(setDateHour(messages[index - 1].createdAt))
              : null;
          const showDateBetweenMessages =
            prevMessageDate &&
            prevMessageDate.toDateString() !== messageDate.toDateString();
          const isLastMessage = index === messages.length - 1;

          return (
            <div key={index} className={styles.chat}>
              {showDateBetweenMessages && (
                <div className={styles.dateContainer}>
                  <hr />
                  <div className={styles.date}>{getDate(prevMessageDate)}</div>
                  <hr />
                </div>
              )}
              {message.messageType === 'SEND' && (
                <div
                  className={cx(styles.messageContainer, {
                    [styles.myMsg]: message.userId === user.userId,
                    [styles.othersMsg]: message.userId !== user.userId,
                  })}
                >
                  <div className={styles.profileSize}>
                    <Image
                      src={
                        usersImage[message.userId]
                          ? getImageUrl(usersImage[message.userId])
                          : Profile
                      }
                      alt="유저 프로필"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover', borderRadius: '50%' }}
                    />
                  </div>
                  <div className={styles.textArea}>
                    <div className={styles.name}>{message.nickname}</div>
                    <div className={styles.textContainer}>
                      <div className={styles.message}>
                        {message.content.split('\n').map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </div>
                      <div className={styles.date}>
                        {getHour(message.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {message.messageType === 'JOIN' && (
                <div className={styles.lineStyle}>
                  <div className={styles.lineText}>
                    {message.nickname}님이 입장하셨습니다.
                  </div>
                </div>
              )}
              {message.messageType === 'LEAVE' && (
                <div className={styles.lineStyle}>
                  <div className={styles.lineText}>
                    {message.nickname}님이 퇴장하셨습니다.
                  </div>
                </div>
              )}
              {isLastMessage && (
                <div className={styles.dateContainer}>
                  <hr />
                  <div className={styles.date}>{getDate(messageDate)}</div>
                  <hr />
                </div>
              )}
              {index === unreadMessageCount - 1 && moveScroll && (
                <div ref={targetRef}></div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ChatRoom;
