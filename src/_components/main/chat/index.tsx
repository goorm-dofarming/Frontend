import React from 'react';

// styles
import { ChatContainer } from '@/src/_styles/main/chatStyles';

// components
import ChatList from './chatList/ChatList';
import ChatSpace from './chatSpace/ChatSpace';

// api
import { useQuery } from '@tanstack/react-query';
import { getEntireChatRooms, getMyChatRooms } from '@/pages/api/chat';

const Chat = () => {
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

  return (
    <ChatContainer>
      <ChatList
        myChats={myChats}
        myChatError={myChatError}
        myChatLoading={myChatLoading}
        entireChats={entireChats}
        entireChatError={entireChatError}
        entireChatLoading={entireChatLoading}
        refetchChatList={refetchChatList}
      />
      <ChatSpace refetchChatList={refetchChatList} />
    </ChatContainer>
  );
};

export default Chat;
