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

// hooks
import useToggle from '@/app/hooks/Home/useToggle';
import Modal from '@/app/_components/Common/Modal';

const ChatList = () => {
  // true => 내 채팅 , false => 오픈 채팅
  const [activeTab, setActiveTab] = useState(true);

  const [modal, setModal] = useState<boolean>(false);
  const openModal = useToggle(modal, setModal);

  const handleCreateChat = (data: {
    title: string;
    region: string;
    tags: string[];
  }) => {
    console.log(data);
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
      {activeTab ? <MyChatList /> : <EntireChatList />}
      <Modal openModal={openModal} modal={modal} width="35rem" height="40rem">
        <CreateChat openModal={openModal} onCreateChat={handleCreateChat} />
      </Modal>
    </div>
  );
};

export default ChatList;
