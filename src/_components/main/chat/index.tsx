import React, { useEffect, useRef, useState } from 'react';

// styles
import { ChatContainer } from '@/src/_styles/main/chatStyles';

// components
import ChatList from './chatList/ChatList';
import ChatSpace from './chatSpace/ChatSpace';

// api
import { useQuery } from '@tanstack/react-query';
import {
  getChatRoomList,
  getMyChatRooms,
  sendLastMessage,
} from '@/pages/api/chat';
import { getMessage } from '@/pages/api/chat';

// web-socket
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// atoms
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedChatState, userState } from '@/src/atom/stats';
import { Message } from '@/src/types/aboutChat';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const [message, setMessage] = useState<Message | null>(null);
  const stompClientRef = useRef<Client | null>(null);
  const user = useRecoilValue(userState);

  const myChatQuery = useQuery({
    queryKey: ['myChats'],
    queryFn: () => getMyChatRooms({}),
    retry: 3,
    refetchInterval: 60000,
  });

  const entireChatQuery = useQuery({
    queryKey: ['entireChats'],
    queryFn: () => getChatRoomList({}),
    retry: 3,
    refetchInterval: 60000,
  });

  const refetchChatList = () => {
    myChatQuery.refetch();
    entireChatQuery.refetch();
  };

  useEffect(() => {
    refetchChatList();
  }, [user]);

  const messageQuery = useQuery({
    queryKey: ['messages', selectedChat?.roomId],
    queryFn: () => getMessage({ roomId: selectedChat.roomId }),
    enabled: false,
  });

  useEffect(() => {
    if (user.userId > 0) {
      setSelectedChat({
        roomId: 0,
        title: '',
        regionName: '',
        regionImageUrl: '',
        tags: [],
        participantCount: 0,
        createdAt: new Date(),
        unreadMessageCount: 0,
        latestMessage: {
          messageType: '',
          content: '',
          nickname: '',
        },
      });
    }
  }, [user]);

  useEffect(() => {
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
        stompClient.subscribe(
          `/room/${selectedChat.roomId}`,
          (messageOutput) => {
            const receivedMessage = JSON.parse(messageOutput.body);
            if (selectedChat.roomId > 0) {
              setMessage(receivedMessage);
            }
          }
        );
        if (selectedChat.roomId > 0) {
          messageQuery.refetch();
        }
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
  }, [selectedChat]);

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

    await messageQuery.refetch();
  };

  const sendLastJoin = async (msg: Message) => {
    if (msg) {
      try {
        await sendLastMessage({
          roomId: msg.roomId,
          messageId: msg.messageId,
        });
      } catch (error) {
        console.error('Failed to save messages:', error);
      }
    }
  };

  useEffect(() => {
    if (messageQuery.data && messageQuery.data.length > 0) {
      if (message && message.roomId === messageQuery.data[0].roomId) {
        sendLastJoin(message);
      } else {
        sendLastJoin(messageQuery.data[0]);
      }
    }
  }, [messageQuery, message]);

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
        messageQuery={messageQuery}
        stompClientRef={stompClientRef}
        leaveMessage={leaveMessage}
        message={message}
      />
    </ChatContainer>
  );
};

export default Chat;
