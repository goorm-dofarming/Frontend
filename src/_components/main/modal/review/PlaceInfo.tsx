import React, { useState } from 'react';
import styles from '@/src/_components/main/modal/review/placeinfo.module.scss';
import Image from 'next/image';

// icons
import { FaHeart } from 'react-icons/fa';
import Profile from '@/src/_assets/main/userProfile.svg';
import Modal from '@/src/_components/Common/Modal';
import useToggle from '@/src/hooks/Home/useToggle';
import MakeReview from './MakeReview';

interface PlaceInfoProps {
  openModal: () => void;
}

const PlaceInfo: React.FC<PlaceInfoProps> = ({ openModal }) => {
  const [modal, setModal] = useState<boolean>(false);
  const openReview = useToggle(modal, setModal);
  return (
    <div className={styles.container}>
      <div
        className={styles.infoContainer}
        style={{
          backgroundImage:
            "url('https://cdn.ksilbo.co.kr/news/photo/202108/909436_507690_2026.jpg')",
        }}
      >
        <div className={styles.leftSection}>
          <div className={styles.title}>
            <div className={styles.titleText1}>용용선생 선릉점</div>
            <div className={styles.liked}>
              <FaHeart color="#e9000a" size={'1.5rem'} /> x 100
            </div>
          </div>
          <div className={styles.address}>
            서울특별시 강남구 선릉로86길 44 1층
          </div>
          <div className={styles.telephone}>Tel : 0507-1492-2219</div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.titleText2}>평점</div>
          <div className={styles.gradeText}>4.0</div>
          <div className={styles.stars}>⭐️ ⭐️ ⭐️ ⭐️ ⭐️</div>
        </div>
      </div>
      <div className={styles.reviewContainer}>
        <div className={styles.buttonArea}>
          <div className={styles.titleText}>정렬 기준</div>
          <div className={styles.buttons}>
            <div className={styles.sortingBtns}>
              <div className={styles.sortingBtn}>좋아요순</div>
              <div className={styles.sortingBtn}>최신순</div>
              <div className={styles.sortingBtn}>평점 높은 순</div>
              <div className={styles.sortingBtn}>평점 낮은 순</div>
            </div>
            <div className={styles.reviewBtn} onClick={openReview}>
              리뷰 하기
            </div>
          </div>
        </div>
        <div className={styles.reviewArea}>
          <div className={styles.review}>
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
            <div className={styles.textArea}>
              <div className={styles.userName}>걷기 좋아하는 모험가</div>
              <div className={styles.starArea}>
                <div className={styles.stars}>⭐️ ⭐️ ⭐️ ⭐️ ⭐️</div>
                <div className={styles.date}>2024.07.31</div>
              </div>
              <div className={styles.text}>
                블라블라... 너무 좋았고...
                <br />
                다음에 또 오겠고...
              </div>
              <div className={styles.images}>
                <div className={styles.image}>
                  <Image
                    src={
                      'https://blog.kakaocdn.net/dn/bKsJkm/btshWtKt3cK/IzBaBsusKAodfARBdOsOY1/img.jpg'
                    }
                    alt="유저 프로필"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', borderRadius: '10px' }}
                  />
                </div>
                <div className={styles.image}>
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
            </div>
          </div>
          {/* 반복 - 스크롤 확인용 */}
          <div className={styles.review}>
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
            <div className={styles.textArea}>
              <div className={styles.userName}>걷기 좋아하는 모험가</div>
              <div className={styles.starArea}>
                <div className={styles.stars}>⭐️ ⭐️ ⭐️ ⭐️ ⭐️</div>
                <div className={styles.date}>2024.07.31</div>
              </div>
              <div className={styles.text}>
                블라블라...너무 좋았고...
                <br />
                다음에 또 오겠고...
              </div>
              <div className={styles.images}>
                <div className={styles.image}>
                  <Image
                    src={
                      'https://blog.kakaocdn.net/dn/bKsJkm/btshWtKt3cK/IzBaBsusKAodfARBdOsOY1/img.jpg'
                    }
                    alt="유저 프로필"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', borderRadius: '10px' }}
                  />
                </div>
                <div className={styles.image}>
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
            </div>
          </div>
          {/* 반복 - 스크롤 확인용 */}
        </div>
      </div>
      <Modal openModal={openReview} modal={modal} width="35rem" height="40rem">
        <MakeReview openModal={openReview} />
      </Modal>
    </div>
  );
};

export default PlaceInfo;
