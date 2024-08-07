import React from 'react';
import styles from '@/src/_components/main/modal/smallmodal.module.scss';

interface DeleteReviewProps {
  openModal: () => void;
  reviewId: number;
  onDeleteReview: (reviewId: number) => void;
}

const DeleteReview: React.FC<DeleteReviewProps> = ({
  openModal,
  reviewId,
  onDeleteReview,
}) => {
  const handleLeaveChat = () => {
    onDeleteReview(reviewId);
    openModal();
  };
  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.text}>
        정말 리뷰를 삭제하시겠습니까?
        <br />
        삭제된 리뷰는 되돌릴 수 없습니다.
      </div>
      <button className={styles.yesBtn} onClick={handleLeaveChat}>
        네
      </button>
    </div>
  );
};

export default DeleteReview;
