import React from 'react';
import styles from '@/src/_components/main/modal/chat/smallmodal.module.scss';

interface LeaveChatProps {
  openModal: () => void;
  roomId: number;
  onLeaveChat: (data: { roomId: number }) => void;
}

const LeaveChat: React.FC<LeaveChatProps> = ({
  openModal,
  roomId,
  onLeaveChat,
}) => {
  const handleLeaveChat = () => {
    onLeaveChat({ roomId });
    openModal();
  };
  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.text}>채팅방을 나가시겠습니까?</div>
      <button className={styles.yesBtn} onClick={handleLeaveChat}>
        네
      </button>
    </div>
  );
};

export default LeaveChat;
