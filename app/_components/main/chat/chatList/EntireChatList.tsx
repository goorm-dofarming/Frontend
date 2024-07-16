"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

// styles
import cx from "classnames";
import styles from "./chatlist.module.scss";

// api
import { getMyChats } from "@/app/api/chat/useGetMyChats";
import { getEntireChats } from "@/app/api/chat/useGetEntireChats";

// types
import { Chat } from "@/app/types/aboutChat";

// atom
import { useRecoilState } from "recoil";
import { selectedChatState } from "@/app/atom/stats";

// 추후 이미지는 서버에서 가져옴
const getImageUrlByRegionId = (regionId: number): string => {
  const imageMap: { [key: number]: string } = {
    1: "/region/경상남도.png",
    2: "/region/충청북도.png",
    3: "/region/부산광역시.png",
  };
  return imageMap[regionId] || "/app/_assets/region/경상남도.png"; // 기본 이미지
};

const EntireChatList = () => {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);

  const handleSelectedChat = (chat: Chat) => {
    if (isInMyChats(chat.roomId)) {
      setSelectedChat(chat);
    }
  };

  const { data: myChats = [] } = useQuery<Chat[], Error>({
    queryKey: ["myChats"],
    queryFn: getMyChats,
  });

  const {
    data: entireChats = [],
    error,
    isLoading,
  } = useQuery<Chat[], Error>({
    queryKey: ["entireChats"],
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
                src={getImageUrlByRegionId(chat.regionId)}
                alt={`Region ${chat.regionId}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className={styles.region}>{chat.regionId}</div>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.title}>{chat.title}</div>
            <div className={styles.overview}>
              {chat.overview
                .split("#")
                .filter((tag) => tag !== "")
                .map((tag, index) => (
                  <div key={index} className={styles.hashtag}>
                    #{tag}
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
