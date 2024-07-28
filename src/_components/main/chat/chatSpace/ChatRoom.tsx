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
import { userState } from '@/src/atom/stats';

// types
import { Message } from '@/src/types/aboutChat';

// api
import axios from 'axios';
import { getUser } from '@/pages/api/user';
import Landing from '@/src/_components/Common/Landing';

// 메세지 검색해서 가져오고 웹 소켓 연결하고 룸 구독
// room/{roomId}
// chat/sendmessage

const ChatRoom: React.FC<{
  messageQuery: QueryObserverResult<Message[], Error>;
}> = ({ messageQuery }) => {
  const { data: messages = [], error, isLoading } = messageQuery;
  const [user] = useRecoilState(userState);
  const [usersImage, setUsersImage] = useState<{
    [key: number]: string | null;
  }>({});
  const prevDateRef = useRef<Date | null>(null);

  // 유저 이미지는 없거나 undifined
  // 기본 이미지 이거나 null
  // 존재할 수 있다 imageUrl

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
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줌
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일`;
  };

  const getHour = (data: string) => {
    const date = new Date(data);

    date.setHours(date.getHours() + 9);

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const period = hours < 12 ? '오전' : '오후';
    const displayHours = hours % 12 || 12; // 0시, 12시 구분
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
    <div className={styles.chatRoom}>
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
                      <div className={styles.message}>{message.content}</div>
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
            </div>
          );
        })}
    </div>
  );
};

export default ChatRoom;
