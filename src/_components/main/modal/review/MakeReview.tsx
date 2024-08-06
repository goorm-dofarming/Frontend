import React, { useCallback, useState } from 'react';
import styles from '@/src/_components/main/modal/review/makereview.module.scss';
import Image from 'next/image';

// icons
import Profile from '@/src/_assets/main/userProfile.svg';
import { FaImage } from 'react-icons/fa6';

// componnents
import StarScore from '@/src/_components/main/modal/review/Star';
import Toast from '@/src/_components/Common/Toast';

// atoms
import { useRecoilValue } from 'recoil';
import { userState } from '@/src/atom/stats';

// hooks
import useToggle from '@/src/hooks/Home/useToggle';

interface MakeReviewProps {
  openModal: () => void;
  locationId: number;
  onMakeReview: (
    score: number,
    content: string,
    locationId: number,
    images: File[]
  ) => void;
}

const MakeReview: React.FC<MakeReviewProps> = ({
  openModal,
  locationId,
  onMakeReview,
}) => {
  const user = useRecoilValue(userState);
  const [content, setContent] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // 토스트
  const [toast, setToast] = useState<boolean>(false);
  const openToast = useToggle(toast, setToast);

  const getImageUrl = (url: string) => {
    if (url && !url.startsWith('http') && !url.startsWith('https')) {
      return `${process.env.NEXT_PUBLIC_DEPLOY_PROFILE_IMAGE_ADDRESS}/${url}`;
    }
    return url;
  };

  const handleScoreChange = (value: number) => {
    setScore(value);
  };

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setImages((prevImages) => [...prevImages, file]);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSelectedImages((prevImages) => [
            ...prevImages,
            reader.result as string,
          ]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleCancelBtn = () => {
    setContent('');
    setImages([]);
    setScore(0);
    setSelectedImages([]);
    openModal();
  };

  const handleMakeReview = () => {
    if (score === 0) {
      openToast();
      return;
    }
    onMakeReview(score, content, locationId, images);
    setContent('');
    setImages([]);
    setScore(0);
    setSelectedImages([]);
    openModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.userImage}>
          <Image
            src={user.imageUrl ? getImageUrl(user.imageUrl) : Profile}
            alt="유저 프로필"
            className="icons profile"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover', borderRadius: '50%' }}
          />
        </div>
        <div className={styles.userName}>{user.nickname}</div>
      </div>
      <div className={styles.stars}>
        <StarScore value={score} onChange={handleScoreChange} size={3} />
      </div>
      <div className={styles.textArea}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="당신의 경험을 공유해주세요 !"
        />
      </div>
      <input
        type="file"
        id="locationImages"
        onChange={handleImageAdd}
        className={styles.fake}
        accept="image/*"
      />
      <label className={styles.imageBtn} htmlFor="locationImages">
        <FaImage size={'1rem'} /> 사진 추가하기
      </label>
      <div className={styles.images}>
        {selectedImages.map((imageUrl, index) => (
          <div key={index} className={styles.image}>
            <div
              className={styles.deleteBtn}
              onClick={() => deleteImage(index)}
            >
              X
            </div>
            <Image
              src={imageUrl}
              alt="유저 프로필"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover', borderRadius: '10px' }}
            />
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        <div className={styles.cancelBtn} onClick={handleCancelBtn}>
          취소
        </div>
        <div className={styles.submitBtn} onClick={handleMakeReview}>
          게시
        </div>
      </div>
      <Toast
        content={'별점은 필수 요소입니다.'}
        toast={toast}
        openToast={openToast}
        toastType="warning"
      />
    </div>
  );
};

export default MakeReview;
