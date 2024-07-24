'use client';
import React, { useEffect, useRef, useState } from 'react';

// styles
import cx from 'classnames';
import styles from './chatspace.module.scss';

// icon
import { FaCircleUser } from 'react-icons/fa6';

// atom
import { useRecoilState } from 'recoil';
import { userState } from '@/src/atom/stats';

// types
import { Message } from '@/src/types/aboutChat';

// 메세지 검색해서 가져오고 웹 소켓 연결하고 룸 구독
// room/{roomId}
// chat/sendmessage

const ChatRoom: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const [user] = useRecoilState(userState);

  return (
    <div className={styles.chatRoom}>
      {messages.length > 0 &&
        user &&
        messages.map((message, index) => (
          <div key={index}>
            {message.messageType === 'SEND' && (
              <div
                className={cx(styles.messageContainer, {
                  [styles.myMsg]: message.userId === user.userId,
                  [styles.othersMsg]: message.userId !== user.userId,
                })}
              >
                <div className={styles.profileSize}>
                  <FaCircleUser fill="#ED5A51" size="2.5rem" />
                </div>
                <div className={styles.textArea}>
                  <div className={styles.name}>{message.nickname}</div>
                  <div className={styles.message}>{message.content}</div>
                </div>
              </div>
            )}
            {message.messageType === 'JOIN' && (
              <div className={styles.lineStyle}>
                <hr />
                <div className={styles.lineText}>
                  {message.nickname}님이 입장하셨습니다.
                </div>
                <hr />
              </div>
            )}
            {message.messageType === 'LEAVE' && (
              <div className={styles.lineStyle}>
                <hr />
                <div className={styles.lineText}>
                  {message.nickname}님이 퇴장하셨습니다.
                </div>
                <hr />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ChatRoom;
