import React from 'react';
import styles from '@/src/_components/main/modal/chat/smallmodal.module.scss';

// types
import { Chat } from '@/src/types/aboutChat';

interface EnterChatProps {
  openModal: () => void;
  chat: Chat | null;
  onEnterChat: (data: { chat: Chat }) => void;
}

const EnterChat: React.FC<EnterChatProps> = ({
  openModal,
  chat,
  onEnterChat,
}) => {
  const handleEnterChat = () => {
    if (chat) {
      onEnterChat({ chat });
    }
    openModal();
  };
  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.text}>채팅방에 입장하시겠습니까?</div>
      <button className={styles.yesBtn} onClick={handleEnterChat}>
        네
      </button>
    </div>
  );
};

export default EnterChat;
