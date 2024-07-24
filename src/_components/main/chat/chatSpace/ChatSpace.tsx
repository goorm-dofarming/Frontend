"use client";
import React, { useState } from "react";
import Image from "next/image";

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
import axios from "axios";
import { leaveChatRoom } from "@/pages/api/chat";

const ChatSpace: React.FC<{ refetchChatList: () => void }> = ({
  refetchChatList,
}) => {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);

  // 채팅방 퇴장 모달
  const [modal, setModal] = useState<boolean>(false);
  const openModal = useToggle(modal, setModal);

  const handleLeaveChat = async (data: { roomId: number }) => {
    const { roomId } = data;
    try {
      const response = await leaveChatRoom(roomId);
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

  if (selectedChat.title === "") {
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
          <ChatRoom />
          <div className={styles.inputArea}>
            <textarea
              className={styles.input}
              placeholder="메세지를 입력하세요"
            />
            <button className={styles.enterBtn}>전송</button>
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
