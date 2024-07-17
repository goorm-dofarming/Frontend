'use client';
import React from 'react';
import Image from 'next/image';

// icon
import logo from '@/app/_assets/icons/main_logo.png';

// styles
import styles from './chatspace.module.scss';

// atom
import { useRecoilValue } from 'recoil';
import { selectedChatState } from '@/app/atom/stats';
import ChatRoom from './ChatRoom';

const ChatSpace = () => {
  const selectedChat = useRecoilValue(selectedChatState);

  if (selectedChat.title === '') {
    return (
      <div className="chatSpace">
        <div className={styles.logoImage}>
          <Image src={logo} alt="logo" layout="fill" objectFit="contain" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="chatSpace">
        <div className={styles.chatSpace}>
          <div className={styles.header}>
            <button className={styles.quitBtn}>나가기</button>
            <div className={styles.imageContainer}>
              <div className={styles.imageSize}>
                <Image
                  src={'/region/경상남도.png'}
                  alt={`Region ${selectedChat.regionName}`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className={styles.region}>{selectedChat.regionName}</div>
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.title}>{selectedChat.title}</div>
              <div className={styles.overview}>
                {(selectedChat.tags ?? []).map((tag, index) => (
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
          </div>
          <ChatRoom />
          <div className={styles.inputArea}>
            <textarea
              className={styles.input}
              placeholder="메세지를 입력하세요"
            />
            <button className={styles.enterBtn}>전송</button>
          </div>
        </div>
      </div>
    );
  }
};

export default ChatSpace;
