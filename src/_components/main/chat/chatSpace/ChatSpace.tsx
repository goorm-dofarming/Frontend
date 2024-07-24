import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Client, Stomp } from '@stomp/stompjs';

// icon
import logo from "@/src/_assets/icons/main_logo.png";

// styles
import styles from "./chatspace.module.scss";

// atom
import { useRecoilState } from "recoil";
import { selectedChatState } from "@/src/atom/stats";

// components
import ChatRoom from "./ChatRoom";
import Modal from "@/src/_components/Common/Modal";
import LeaveChat from "../../modal/chat/LeaveChat";

// hooks
import useToggle from "@/src/hooks/Home/useToggle";

// api
import axios from 'axios';
import { leaveChatRoom } from '@/pages/api/chat';
import { Message } from '@/src/types/aboutChat';
import { User } from '@/src/types/aboutMain';

const ChatSpace: React.FC<{
  refetchChatList: () => void;
  messages: Message[];
  user: User | undefined;
  stompClientRef: React.MutableRefObject<Client | null>;
  leaveMessage: (roomId: number) => void;
}> = ({ refetchChatList, messages, user, stompClientRef, leaveMessage }) => {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const [input, setInput] = useState<string>('');

  // 채팅방 퇴장 모달
  const [modal, setModal] = useState<boolean>(false);
  const openModal = useToggle(modal, setModal);

  const handleLeaveChat = async (data: { roomId: number }) => {
    const { roomId } = data;
    try {
      await leaveChatRoom(roomId);
      leaveMessage(roomId);
      refetchChatList();
      // 선택된 채팅 초기화
      setSelectedChat({
        roomId: 0,
        title: "",
        regionName: "",
        regionImageUrl: "",
        tags: [],
        participantCount: 0,
        createAt: new Date(),
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
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

  if (selectedChat.title === '') {
    return (
      <div className="chatSpace">
        <div className={styles.logoImage}>
          <Image
            src={logo}
            alt="logo"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "contain" }}
          />
        </div>
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
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className={styles.region}>{selectedChat.regionName}</div>
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.titleContainer}>
                <div className={styles.title}>{selectedChat.title}</div>
                <span className={styles.count}>
                  {selectedChat.participantCount}
                </span>
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
          <ChatRoom messages={messages} user={user} />
          <div className={styles.inputArea}>
            <textarea
              className={styles.input}
              placeholder="메세지를 입력하세요"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
