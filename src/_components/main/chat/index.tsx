import React, { useEffect, useRef } from 'react';

// styles
import { ChatContainer } from '@/src/_styles/main/chatStyles';

// components
import ChatList from './chatList/ChatList';
import ChatSpace from './chatSpace/ChatSpace';

// api
import { useQuery } from '@tanstack/react-query';
import { getEntireChatRooms, getMyChatRooms } from '@/pages/api/chat';
import { getMessage } from '@/pages/api/chat';
import { getMe } from '@/pages/api/user';

// web-socket
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';

// atoms
import { useRecoilState } from 'recoil';
import { selectedChatState } from '@/src/atom/stats';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const stompClientRef = useRef<Client | null>(null);

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

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  // console.log('user : ', user);

  const {
    data: messages = [],
    error,
    isLoading,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ['messages', selectedChat?.roomId],
    queryFn: () => getMessage({ roomId: selectedChat.roomId }),
  });

  useEffect(() => {
    if (selectedChat.title === '') return;

    // SockJS 클라이언트 생성
    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_DEPLOY_WEBSOCKET_ADDRESS}`
    );
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
      onConnect: (frame) => {
        console.log('Connected: ' + frame);

        stompClient.subscribe(
          `/room/${selectedChat.roomId}`,
          (messageOutput) => {
            const message = JSON.parse(messageOutput.body);
            console.log('Subscribe: ', message);
            refetchMessages();
          }
        );
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    stompClientRef.current = stompClient;
    stompClient.activate();

    // 컴포넌트가 언마운트되거나 selectedChat이 변경될 때 연결 해제
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        console.log('Disconnected from STOMP broker.');
      }
    };
  }, [selectedChat, refetchMessages]);

  // 채팅방 입장 메세지
  const joinMessage = async (roomId: number) => {
    const messageObject = {
      roomId: roomId,
      userId: user?.userId,
      nickname: user?.nickname,
      messageType: 'JOIN',
      content: '',
    };

    if (stompClientRef.current) {
      stompClientRef.current.publish({
        destination: '/chat/sendMessage',
        body: JSON.stringify(messageObject),
      });
    }

    await refetchMessages();
  };

  // 채팅방 퇴장 메세지
  const leaveMessage = (roomId: number) => {
    const messageObject = {
      roomId: roomId,
      userId: user?.userId,
      nickname: user?.nickname,
      messageType: 'LEAVE',
      content: '',
    };

    if (stompClientRef.current) {
      stompClientRef.current.publish({
        destination: '/chat/sendMessage',
        body: JSON.stringify(messageObject),
      });
    }
  };

  return (
    <ChatContainer>
      <ChatList
        myChatQuery={myChatQuery}
        entireChatQuery={entireChatQuery}
        refetchChatList={refetchChatList}
        joinMessage={joinMessage}
      />
      <ChatSpace
        refetchChatList={refetchChatList}
        messages={messages}
        user={user}
        stompClientRef={stompClientRef}
        leaveMessage={leaveMessage}
      />
    </ChatContainer>
  );
};

export default Chat;
