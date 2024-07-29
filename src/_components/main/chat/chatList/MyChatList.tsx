import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { QueryObserverResult } from '@tanstack/react-query';

// styles
import cx from 'classnames';
import styles from './chatlist.module.scss';

// types
import { Alarm, Chat } from '@/src/types/aboutChat';

// atom
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  messageAlarmState,
  searchState,
  selectedChatState,
} from '@/src/atom/stats';

// icons
import { FaRegFaceSadCry } from 'react-icons/fa6';
import ChatLoader from '@/src/_components/Common/ChatLoader';
import { getMyChatRooms } from '@/pages/api/chat';
import { getUser } from '@/pages/api/user';
import axios from 'axios';

interface MyChatListProps {
  myChatQuery: QueryObserverResult<Chat[], Error>;
}

const MyChatList: React.FC<MyChatListProps> = ({ myChatQuery }) => {
  const search = useRecoilValue(searchState);
  const { data, error, isLoading: loading } = myChatQuery;
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);

  // 내 채팅 리스트
  const [myChats, setMyChats] = useState<Chat[]>(myChatQuery.data ?? []);

  // 내 채팅 리스트를 보고 있을 때 알림이 수신되면 업데이트
  const messageAlarm = useRecoilValue(messageAlarmState);
  const [alarm, setAlarm] = useState<boolean>(false);

  const handleSelectedChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  // 내 채팅 리스트
  useEffect(() => {
    if (data && data !== myChats) {
      setMyChats(data);
    }
  }, [data]);

  const formatLastMessage = (
    name: string,
    content: string,
    type: string
  ): string => {
    let message = '';
    switch (type) {
      case 'SEND':
        message = `${name} : ${content}`;
        break;
      case 'JOIN':
        message = `${name}님이 입장하셨습니다.`;
        break;
      case 'LEAVE':
        message = `${name}님이 퇴장하셨습니다.`;
        break;
      default:
        message = content;
    }
    return message;
  };

  // 알람 수신 시 마지막 채팅 업데이트
  const setLastMessageByAlarm = async (message: Alarm): Promise<string> => {
    let content = '';
    try {
      const user = await getUser(message.senderId);
      const name = user.nickname;

      content = formatLastMessage(name, message.content, message.messageType);

      return content;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
    return content;
  };

  useEffect(() => {
    const updateChatList = async () => {
      const lastMessage = await setLastMessageByAlarm(messageAlarm);
      // 안읽은 채팅 수, 마지막 채팅 메세지 업데이트
      setMyChats((prevChats) => {
        const updatedChats = prevChats.map((chat) => {
          if (chat.roomId === messageAlarm.roomId) {
            return {
              ...chat,
              latestMessage: {
                messageType: '',
                content: lastMessage,
                nickname: '',
              },
              unreadMessageCount:
                chat.roomId === selectedChat.roomId
                  ? 0
                  : chat.unreadMessageCount + 1,
              participantCount:
                messageAlarm.messageType === 'JOIN'
                  ? chat.participantCount + 1
                  : messageAlarm.messageType === 'LEAVE'
                    ? chat.participantCount - 1
                    : chat.participantCount,
            };
          }
          return chat;
        });

        // 최신 알림이 있는 채팅방을 맨 앞으로 이동
        const chatIndex = updatedChats.findIndex(
          (chat) => chat.roomId === messageAlarm.roomId
        );
        if (chatIndex > -1) {
          const [updatedChat] = updatedChats.splice(chatIndex, 1);
          updatedChats.unshift(updatedChat);
        }

        return updatedChats;
      });
    };
    if (alarm) {
      updateChatList();
    }
    setAlarm(true);
  }, [messageAlarm]);

  // 채팅방 클릭 시 안읽은 알람 초기화
  useEffect(() => {
    if (selectedChat?.roomId) {
      setMyChats((prevChats) => {
        const updatedChats = prevChats.map((chat) => {
          if (chat.roomId === selectedChat.roomId) {
            return {
              ...chat,
              unreadMessageCount: 0,
            };
          }
          return chat;
        });

        return updatedChats;
      });
    }
  }, [selectedChat]);

  if (loading) {
    return (
      <div className={styles.container}>
        <ChatLoader />
      </div>
    );
  }
  if (error)
    return (
      <div className={styles.container}>
        <div className={styles.error}>Error</div>
        <div className={styles.errorMsg}>{error.message}</div>
      </div>
    );

  return (
    <div className={styles.chats}>
      {myChats.length > 0 ? (
        myChats.map((chat, index) => (
          <div
            key={index}
            className={cx(styles.chat, styles.hoverEffect, {
              [styles.active]: selectedChat?.roomId === chat.roomId,
            })}
            onClick={() => handleSelectedChat(chat)}
          >
            <div className={styles.imageContainer}>
              <div className={styles.imageSize}>
                <Image
                  src={`/region/${chat.regionName}.png`}
                  alt={`${chat.regionName}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className={styles.region}>{chat.regionName}</div>
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.titleContainer}>
                <div className={styles.title}>{chat.title}</div>
                <span className={styles.count}>{chat.participantCount}</span>
              </div>
              <div className={styles.preview}>
                {formatLastMessage(
                  chat.latestMessage.nickname,
                  chat.latestMessage.content,
                  chat.latestMessage.messageType
                )}
              </div>
            </div>
            {chat.unreadMessageCount > 0 &&
              selectedChat.roomId !== chat.roomId && (
                <div className={styles.chatBadge}>
                  {chat.unreadMessageCount}
                </div>
              )}
          </div>
        ))
      ) : search ? (
        <div className={styles.noChat}>
          <FaRegFaceSadCry />
          <br />
          검색 결과가 없습니다.
        </div>
      ) : (
        <div className={styles.noChat}>
          아직 채팅에 참여를 안하셨군요 !
          <br />
          <br />
          채팅을 만들거나,
          <br />
          오픈 채팅에서 다른 채팅에 입장해보세요 !
        </div>
      )}
    </div>
  );
};

export default MyChatList;
