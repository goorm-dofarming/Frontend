"use client";
import React, { useState } from "react";

// style
import cx from "classnames";
import styles from "./chatlist.module.scss";

// icons
import { IoSearch } from "react-icons/io5";
import { TbMessageCirclePlus } from "react-icons/tb";

// components
import EntireChatList from "./EntireChatList";
import MyChatList from "./MyChatList";

const ChatList = () => {
  // true => 내 채팅 , false => 오픈 채팅
  const [activeTab, setActiveTab] = useState(true);

  return (
    <div className="chatList">
      <div className={styles.tabArea}>
        <div
          className={cx(styles.tab, {
            [styles.active]: activeTab,
          })}
          onClick={() => setActiveTab(true)}
        >
          내 채팅
        </div>
        <div
          className={cx(styles.tab, {
            [styles.active]: !activeTab,
          })}
          onClick={() => setActiveTab(false)}
        >
          오픈 채팅
        </div>
      </div>
      <div className={styles.searchArea}>
        <div>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="검색어를 입력하세요"
          />
          <button className={styles.searchBtn}>
            <IoSearch fill="#ED5A51" size="1.5rem" />
          </button>
        </div>
        <TbMessageCirclePlus
          color="#ED5A51"
          size="1.8rem"
          style={{
            visibility: activeTab ? "hidden" : "visible",
            cursor: "pointer",
          }}
        />
      </div>
      {activeTab ? <MyChatList /> : <EntireChatList />}
    </div>
  );
};

export default ChatList;
