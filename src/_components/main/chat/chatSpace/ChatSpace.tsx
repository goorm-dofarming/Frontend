import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Client, Stomp } from '@stomp/stompjs';
import { QueryObserverResult } from '@tanstack/react-query';

// styles
import styles from './chatspace.module.scss';

// atom
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  messageAlarmState,
  selectedChatState,
  userState,
} from '@/src/atom/stats';

// components
import ChatRoom from './ChatRoom';
import Modal from '@/src/_components/Common/Modal';
import LeaveChat from '../../modal/chat/LeaveChat';
import Landing from '@/src/_components/Common/Landing';

// hooks
import useToggle from '@/src/hooks/Home/useToggle';

// api
import axios from 'axios';

// types
import { Message } from '@/src/types/aboutChat';

const ChatSpace: React.FC<{
  refetchChatList: () => void;
  messageQuery: QueryObserverResult<Message[], Error>;
  stompClientRef: React.MutableRefObject<Client | null>;
  leaveMessage: (roomId: number) => void;
}> = ({ refetchChatList, messageQuery, stompClientRef, leaveMessage }) => {
  const [user] = useRecoilState(userState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const [input, setInput] = useState<string>(``);
  const messageAlarm = useRecoilValue(messageAlarmState);
  const [participantCount, setParticipantCount] = useState<number>(
    selectedChat.participantCount
  );
  const [unreadMessageCount, setUnreadMessageCount] = useState<number>(0);

  useEffect(() => {
    setUnreadMessageCount(selectedChat.unreadMessageCount);
  }, [selectedChat]);

  // 채팅방 퇴장 모달
  const [modal, setModal] = useState<boolean>(false);
  const openModal = useToggle(modal, setModal);

  const handleLeaveChat = async (data: { roomId: number }) => {
    const { roomId } = data;
    try {
      leaveMessage(roomId);
      // 선택된 채팅 초기화
      setSelectedChat({
        roomId: 0,
        title: '',
        regionName: '',
        regionImageUrl: '',
        tags: [],
        participantCount: 0,
        createdAt: new Date(),
        unreadMessageCount: 0,
        latestMessage: {
          messageType: '',
          content: '',
          nickname: '',
        },
      });
      setTimeout(() => {
        refetchChatList();
      }, 200);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const sendMessage = () => {
    if (input === '') return;

    const messageObject = {
      roomId: selectedChat.roomId,
      userId: user?.userId,
      nickname: user?.nickname,
      messageType: 'SEND',
      content: input,
    };

    if (stompClientRef.current && input.trim() !== '') {
      stompClientRef.current.publish({
        destination: '/chat/sendMessage',
        body: JSON.stringify(messageObject),
      });

      setInput('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.nativeEvent.isComposing) {
      // 한글 또는 한자, 입력중이면 true였다가 false로 한번 더 실행됨
      return;
    }
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
    if (event.key === 'Enter' && event.shiftKey) {
      setInput((prevInput) => prevInput + `\n`);
    }
  };

  useEffect(() => {
    setParticipantCount(selectedChat.participantCount);
  }, [selectedChat]);

  useEffect(() => {
    if (messageAlarm.roomId === selectedChat.roomId) {
      switch (messageAlarm.messageType) {
        case 'JOIN':
          messageAlarm.senderId !== user.userId &&
            setParticipantCount(participantCount + 1);
          break;
        case 'LEAVE':
          setParticipantCount(participantCount - 1);
          break;
      }
    }
  }, [messageAlarm]);

  if (selectedChat.title === '') {
    return (
      <div className="chatSpace">
        <Landing />
      </div>
    );
  } else {
    return (
      <div className="chatSpace">
        <div className={styles.chatSpace}>
          <div className={styles.header}>
            <button className={styles.quitBtn} onClick={openModal}>
              나가기
            </button>
            <div className={styles.imageContainer}>
              <div className={styles.imageSize}>
                <Image
                  src={`/region/${selectedChat.regionName}.png`}
                  alt={`Region ${selectedChat.regionName}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className={styles.region}>{selectedChat.regionName}</div>
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.titleContainer}>
                <div className={styles.title}>{selectedChat.title}</div>
                <span className={styles.count}>{participantCount}</span>
              </div>
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
          <ChatRoom
            messageQuery={messageQuery}
            unreadMessageCount={unreadMessageCount}
          />
          <div className={styles.inputArea}>
            <textarea
              className={styles.input}
              placeholder="메세지를 입력하세요"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className={styles.enterBtn} onClick={sendMessage}>
              전송
            </button>
          </div>
        </div>
        <Modal openModal={openModal} modal={modal} width="20rem" height="15rem">
          <LeaveChat
            openModal={openModal}
            roomId={selectedChat.roomId}
            onLeaveChat={handleLeaveChat}
          />
        </Modal>
      </div>
    );
  }
};

export default ChatSpace;
