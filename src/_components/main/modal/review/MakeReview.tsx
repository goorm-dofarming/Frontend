import React, { useState } from 'react';
import styles from '@/src/_components/main/modal/review/makereview.module.scss';
import Image from 'next/image';

import Profile from '@/src/_assets/main/userProfile.svg';
import { FaImage } from 'react-icons/fa6';

interface MakeReviewProps {
  openModal: () => void;
}

const MakeReview: React.FC<MakeReviewProps> = ({ openModal }) => {
  const [input, setInput] = useState<string>('');

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.userImage}>
          <Image
            src={Profile}
            alt="유저 프로필"
            className="icons profile"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.userName}>걷기 좋아하는 모험가</div>
      </div>
      <div className={styles.stars}>⭐️ ⭐️ ⭐️ ⭐️ ⭐️</div>
      <div className={styles.textArea}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // onKeyDown={handleKeyDown}
          placeholder="당신의 경험을 공유해주세요 !"
        />
      </div>
      <div className={styles.imageBtn}>
        <FaImage size={'1rem'} /> 사진 추가하기
      </div>
      <div className={styles.images}>
        <div className={styles.image}>
          <div className={styles.deleteBtn}>X</div>
          <Image
            src={
              'https://d12zq4w4guyljn.cloudfront.net/750_750_20231001021851_photo1_9bc2c42093b5.jpg'
            }
            alt="유저 프로필"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover', borderRadius: '10px' }}
          />
        </div>
        <div className={styles.image}>
          <div className={styles.deleteBtn}>X</div>
          <Image
            src={
              'https://d12zq4w4guyljn.cloudfront.net/750_750_20231001021851_photo1_9bc2c42093b5.jpg'
            }
            alt="유저 프로필"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover', borderRadius: '10px' }}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.cancelBtn}>취소</div>
        <div className={styles.submitBtn}>게시</div>
      </div>
    </div>
  );
};

export default MakeReview;
