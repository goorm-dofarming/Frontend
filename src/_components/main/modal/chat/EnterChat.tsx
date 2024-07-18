import React from 'react';
import styles from '@/src/_components/main/modal/chat/smallmodal.module.scss';

interface EnterChatProps {
  openModal: () => void;
  roomId: number;
  onEnterChat: (data: { roomId: number }) => void;
}

const EnterChat: React.FC<EnterChatProps> = ({
  openModal,
  roomId,
  onEnterChat,
}) => {
  const handleEnterChat = () => {
    onEnterChat({ roomId });
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
