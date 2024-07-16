"use client";
import React from "react";
import Image from "next/image";

// icon
import logo from "@/app/_assets/icons/main_logo.png";

// styles
import styles from "./chatspace.module.scss";

// atom
import { useRecoilValue } from "recoil";
import { selectedChatState } from "@/app/atom/stats";
import ChatRoom from "./ChatRoom";

// 추후 이미지는 서버에서 가져옴
const getImageUrlByRegionId = (regionId: number): string => {
  const imageMap: { [key: number]: string } = {
    1: "/region/경상남도.png",
    2: "/region/충청북도.png",
    3: "/region/부산광역시.png",
  };
  return imageMap[regionId] || "/app/_assets/region/경상남도.png"; // 기본 이미지
};

const ChatSpace = () => {
  const selectedChat = useRecoilValue(selectedChatState);

  if (selectedChat.title === "") {
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
                  src={getImageUrlByRegionId(selectedChat.regionId)}
                  alt={`Region ${selectedChat.regionId}`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className={styles.region}>{selectedChat.regionId}</div>
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.title}>{selectedChat.title}</div>
              <div className={styles.overview}>
                {selectedChat.overview
                  .split("#")
                  .filter((tag) => tag !== "")
                  .map((tag, index) => (
                    <div key={index} className={styles.hashtag}>
                      #{tag}
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
