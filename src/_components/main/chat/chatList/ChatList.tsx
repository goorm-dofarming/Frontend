'use client';
import React, { useState } from 'react';

// style
import cx from 'classnames';
import styles from './chatlist.module.scss';

// icons
import { IoSearch } from 'react-icons/io5';
import { TbMessageCirclePlus } from 'react-icons/tb';

// components
import EntireChatList from './EntireChatList';
import MyChatList from './MyChatList';
import CreateChat from '../../modal/CreateChat';
import Modal from '@/src/_components/Common/Modal';

// hooks
import useToggle from '@/src/hooks/Home/useToggle';

// api
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  createChatRoom,
  getEntireChatRooms,
  getMyChatRooms,
} from '@/pages/api/chat';

const ChatList = () => {
  // true => 내 채팅 , false => 오픈 채팅
  const [activeTab, setActiveTab] = useState(true);

  const [modal, setModal] = useState<boolean>(false);
  const openModal = useToggle(modal, setModal);

  const {
    data: myChats = [],
    error: myChatError,
    isLoading: myChatLoading,
    refetch: refetchMyChats,
  } = useQuery({
    queryKey: ['myChats'],
    queryFn: getMyChatRooms,
  });

  const {
    data: entireChats = [],
    error: entireChatError,
    isLoading: entireChatLoading,
    refetch: refetchEntireChats,
  } = useQuery({
    queryKey: ['entireChats'],
    queryFn: getEntireChatRooms,
  });

  const refetchChatList = () => {
    refetchMyChats();
    refetchEntireChats();
  };

  const handleCreateChat = async (data: {
    title: string;
    region: string;
    tags: string[];
  }) => {
    const { title, region, tags } = data;
    const body = {
      title,
      region,
      tagNames: tags,
    };

    try {
      const response = await createChatRoom(body);
      refetchChatList();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

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
          className={styles.makeChat}
          color="#ED5A51"
          size="1.8rem"
          style={{
            visibility: activeTab ? 'hidden' : 'visible',
          }}
          onClick={openModal}
        />
      </div>
      {activeTab ? (
        <MyChatList
          chats={myChats}
          isLoading={myChatLoading}
          error={myChatError}
        />
      ) : (
        <EntireChatList
          chats={entireChats}
          myChats={myChats}
          isLoading={entireChatLoading}
          error={entireChatError}
        />
      )}
      <Modal openModal={openModal} modal={modal} width="35rem" height="40rem">
        <CreateChat openModal={openModal} onCreateChat={handleCreateChat} />
      </Modal>
    </div>
  );
};

export default ChatList;
