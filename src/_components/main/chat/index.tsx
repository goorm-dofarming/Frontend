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
  const myChatQuery = useQuery({
    queryKey: ['myChats'],
    queryFn: getMyChatRooms,
  });

  const entireChatQuery = useQuery({
    queryKey: ['entireChats'],
    queryFn: getEntireChatRooms,
  });

  const refetchChatList = () => {
    myChatQuery.refetch();
    entireChatQuery.refetch();
  };

  return (
    <ChatContainer>
      <ChatList
        myChatQuery={myChatQuery}
        entireChatQuery={entireChatQuery}
        refetchChatList={refetchChatList}
      />
      <ChatSpace refetchChatList={refetchChatList} />
    </ChatContainer>
  );
};

export default Chat;
