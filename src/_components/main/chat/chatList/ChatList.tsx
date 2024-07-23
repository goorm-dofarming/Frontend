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
import CreateChat from '../../modal/chat/CreateChat';
import Modal from '@/src/_components/Common/Modal';

// hooks
import useToggle from '@/src/hooks/Home/useToggle';

// api
import axios from 'axios';
import { QueryObserverResult, useQuery } from '@tanstack/react-query';
import { createChatRoom, getChatRoomList } from '@/pages/api/chat';

// types
import { Chat } from '@/src/types/aboutChat';

// atoms
import { useRecoilState } from 'recoil';
import { searchState } from '@/src/atom/stats';

interface ChatListProps {
  myChatQuery: QueryObserverResult<Chat[], Error>;
  entireChatQuery: QueryObserverResult<Chat[], Error>;
  refetchChatList: () => void;
  joinMessage: (roomId: number) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  myChatQuery,
  entireChatQuery,
  refetchChatList,
  joinMessage,
}) => {
  // true => 내 채팅 , false => 오픈 채팅
  const [activeTab, setActiveTab] = useState(true);

  const [searchInput, setSearchInput] = useState<string>('');
  const [search, setSearch] = useRecoilState(searchState);

  // 채팅방 생성 모달
  const [modal, setModal] = useState<boolean>(false);
  const openModal = useToggle(modal, setModal);

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
      joinMessage(response.data);
      refetchChatList();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === '') {
      setSearch(false);
    }
    setSearchInput(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === 'Enter' && searchInput.trim() !== '') {
      e.preventDefault();
      setSearch(true);
      setSearchInput(searchInput.trim());
    }
  };

  const searchQuery = useQuery({
    queryKey: ['searchChat', searchInput],
    queryFn: () => getChatRoomList({ condition: searchInput }),
    enabled: search && searchInput.trim() !== '', // 검색어가 있을 때만 쿼리 활성화
  });

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
            value={searchInput}
            className={styles.searchInput}
            placeholder="검색어를 입력하세요"
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          <button className={styles.searchBtn} onClick={() => setSearch(true)}>
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
        <MyChatList myChatQuery={myChatQuery} searchQuery={searchQuery} />
      ) : (
        <EntireChatList
          mainQuery={search ? searchQuery : entireChatQuery}
          myChatQuery={myChatQuery}
          refetchChatList={refetchChatList}
          joinMessage={joinMessage}
        />
      )}
      <Modal openModal={openModal} modal={modal} width="35rem" height="40rem">
        <CreateChat openModal={openModal} onCreateChat={handleCreateChat} />
      </Modal>
    </div>
  );
};

export default ChatList;
