import React, { useEffect, useRef, useState } from 'react';
import styles from '@/src/_components/main/modal/review/placeinfo.module.scss';
import Image from 'next/image';
import cx from 'classnames';

// icons
import { IoHeartSharp } from 'react-icons/io5';
import mainLogo from '@/src/_assets/icons/main_logo.png';

// components
import Modal from '@/src/_components/Common/Modal';
import MakeReview from './MakeReview';
import StarScore from './component/Star';
import ChatLoader from '@/src/_components/Common/ChatLoader';
import Landing from '@/src/_components/Common/Landing';
import Toast from '@/src/_components/Common/Toast';
import ReviewComponent from './component/ReviewComponent';

// hooks
import useToggle from '@/src/hooks/Home/useToggle';

// types
import { LocationInfo, Review } from '@/src/types/aboutReview';

// api
import axios from 'axios';
import {
  deleteImage,
  deleteReview,
  getLocationData,
  getMyReview,
  getReviewData,
  makeReview,
  setReviewLike,
  updateReview,
} from '@/pages/api/review';
import { modifyLike } from '@/pages/api/map';

// atoms
import { useRecoilValue } from 'recoil';
import { userState } from '@/src/atom/stats';

interface PlaceInfoProps {
  openModal: () => void;
  locationId: number;
  refetch?: () => void;
}

const PlaceInfo: React.FC<PlaceInfoProps> = ({
  openModal,
  locationId,
  refetch,
}) => {
  const sortTypesKOR = [
    '최신순',
    '오래된순',
    '좋아요 높은 순',
    '좋아요 낮은 순',
    '평점 높은 순',
    '평점 낮은 순',
  ];
  const sortTypes = [
    'Latest',
    'Earliest',
    'HighLike',
    'LowLike',
    'HighScore',
    'LowScore',
  ];
  const user = useRecoilValue(userState);
  const [modal, setModal] = useState<boolean>(false);
  const openReview = useToggle(modal, setModal);
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [myReview, setMyReview] = useState<Review | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedSort, setSelectedSort] = useState<number>(0);
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);
  const [reviewFetchLoading, setReviewFetchLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [toast, setToast] = useState<boolean>(false);
  const openToast = useToggle(toast, setToast);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getLocation = async () => {
    try {
      if (locationId === 0 || locationId === undefined) return;
      if (locationId !== location?.locationId) {
        setIsLoading(true);
      }
      const response = await getLocationData(locationId);
      setLocation(response);
      if (response.isReviewed) {
        const myResponse = await getMyReview(locationId);
        // console.log('my review : ', myResponse);
        setMyReview(myResponse);
      } else {
        setMyReview(null);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      openModal();
      if (axios.isAxiosError(error)) {
        console.error(error);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const getReviews = async () => {
    const params = {
      locationId,
      sortType: sortTypes[selectedSort],
    };

    if (locationId === 0 || locationId === undefined) return;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      setReviewLoading(true);
      if (location && location.isReviewed) {
        const myResponse = await getMyReview(locationId);
        setMyReview(myResponse);
      }
      const response = await getReviewData(params);
      clearTimeout(timeoutId);
      setReviews(response);
      setTimeout(() => {
        setReviewLoading(false);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      clearTimeout(timeoutId);

      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_CANCELED') {
          console.log('Request was canceled due to timeout');
          getReviews();
        } else {
          console.error(error);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    } finally {
      setReviewLoading(false);
      setIsLoading(false);
    }
  };

  const getMoreReviews = async () => {
    const params = {
      locationId,
      reviewId: reviews[reviews.length - 1].reviewId,
      createdAt: reviews[reviews.length - 1].createdAt,
      sortType: sortTypes[selectedSort],
    };

    if (locationId === 0 || locationId === undefined) return;

    try {
      setReviewFetchLoading(true);
      const response = await getReviewData(params);
      if (response.length > 0) {
        const newReviews: Review[] = response;
        setReviews((prev) => [...prev, ...newReviews]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
      } else {
        console.error('Unexpected error:', error);
      }
    } finally {
      setReviewFetchLoading(false);
    }
  };

  const onClickSort = (number: number) => {
    setSelectedSort(number);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const onClickLike = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // 링크의 기본 동작 방지
    if (!user.userId) {
      openToast();
      return;
    }
    const response = await modifyLike(locationId);
    if (response.status === 200) {
      getLocation();
      if (refetch) refetch();
    }
  };

  const onClickReviewBtn = () => {
    if (user.userId === 0 || location?.isReviewed) {
      openToast();
      return;
    } else {
      setIsUpdate(false);
      openReview();
    }
  };

  const onClickUpdate = () => {
    setIsUpdate(true);
    openReview();
  };

  const onClickReviewLike = async (reviewId: number) => {
    if (!user.userId) {
      openToast();
      return;
    }
    await setReviewLike(reviewId);
    getReviews();
  };

  useEffect(() => {
    getLocation();
  }, [locationId, openModal]);

  useEffect(() => {
    setHasMore(true);
    getReviews();
  }, [selectedSort, locationId]);

  useEffect(() => {
    let isMounted = true;
    const currentScrollRef = scrollRef.current;

    const handleScroll = () => {
      if (currentScrollRef) {
        const { scrollTop, scrollHeight, clientHeight } = currentScrollRef;
        if (scrollTop + clientHeight >= scrollHeight - 1) {
          if (isMounted && !reviewLoading && hasMore) {
            getMoreReviews();
          }
        }
      }
    };

    if (currentScrollRef) {
      currentScrollRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener('scroll', handleScroll);
      }
      isMounted = false;
    };
  }, [reviewFetchLoading, hasMore, getMoreReviews]);

  const handleMakeReview = async (
    score: number,
    content: string,
    locationId: number,
    images: File[]
  ) => {
    const formData = new FormData();
    const reviewRequest = {
      locationId: locationId,
      score: score,
      content: content,
    };
    formData.append(
      'reviewCreateRequest',
      new Blob([JSON.stringify(reviewRequest)], { type: 'application/json' })
    );
    if (images.length > 0) {
      images.forEach((image) => formData.append('files', image));
    }
    try {
      await makeReview(formData);
      getLocation();
      getReviews();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleUpdateReview = async (
    reviewId: number,
    score: number,
    content: string,
    images: File[],
    deleteImages: number[]
  ) => {
    // 이미지 삭제
    if (deleteImages && deleteImages.length > 0) {
      for (let imageId of deleteImages) {
        try {
          const response = await deleteImage(imageId);
          // console.log(response);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Axios error:', error);
          } else {
            console.error('Unexpected error:', error);
          }
        }
      }
    }
    // 수정사항 업데이트
    const formData = new FormData();
    const reviewRequest = {
      score: score,
      content: content,
    };
    formData.append(
      'reviewModifyRequest',
      new Blob([JSON.stringify(reviewRequest)], { type: 'application/json' })
    );
    if (images.length > 0) {
      images.forEach((image) => formData.append('files', image));
    }
    try {
      await updateReview(formData, reviewId);
      setIsUpdate(false);
      getLocation();
      getReviews();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      getLocation();
      getReviews();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.landing}>
          <Landing />
        </div>
      ) : (
        <>
          <div
            className={styles.locationImg}
            style={{
              backgroundImage: location?.image
                ? `url(${location.image})`
                : 'none',
              backgroundColor: location?.image ? 'transparent' : 'white',
            }}
          >
            {location?.image === '' && (
              <Image
                src={mainLogo}
                alt="Logo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.leftSection}>
              <div className={styles.title}>
                <div className={styles.titleText1}>{location?.title}</div>
                <div className={styles.liked}>
                  <div
                    onClick={onClickLike}
                    className={cx(
                      styles.heartBtn,
                      { [styles.active]: location?.liked },
                      { [styles.inactive]: !location?.liked }
                    )}
                  >
                    <IoHeartSharp size={'30px'} className={styles.heart} />
                  </div>
                  X {location?.countLikes}
                </div>
              </div>
              <div className={styles.address}>{location?.addr}</div>
              <div className={styles.telephone}>
                {location?.tel !== '' && `Tel : ${location?.tel}`}
              </div>
            </div>
            {location?.totalReview && location?.totalReview > 0 ? (
              <div className={styles.rightSection}>
                <div className={styles.scoreContainer}>
                  <div className={styles.titleText2}>
                    평점 {Math.round(location?.averageScore * 10) / 10}
                  </div>
                  <div className={styles.gradeText}>
                    {`리뷰 ${location.totalReview}개`}
                  </div>
                </div>
                <div className={styles.stars}>
                  <StarScore
                    value={
                      location?.averageScore
                        ? Math.round(location.averageScore * 10) / 10
                        : 0
                    }
                    size={2.5}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.reviewContainer}>
            <div className={styles.buttonArea}>
              <div className={styles.titleText}>정렬 기준</div>
              <div className={styles.buttons}>
                <div className={styles.sortingBtns}>
                  {sortTypesKOR.map((type, index) => (
                    <div
                      key={index}
                      className={cx(styles.sortingBtn, {
                        [styles.sortFocus]: selectedSort === index,
                      })}
                      onClick={() => onClickSort(index)}
                    >
                      {type}
                    </div>
                  ))}
                </div>
                <div
                  className={cx(
                    { [styles.reviewBtn]: !location?.isReviewed },
                    {
                      [styles.noReviewBtn]:
                        location?.isReviewed || user.userId === 0,
                    }
                  )}
                  onClick={onClickReviewBtn}
                >
                  리뷰 작성
                </div>
              </div>
            </div>
            {reviewLoading ? (
              <div className={styles.loader}>
                <ChatLoader />
              </div>
            ) : (
              <div className={styles.reviewArea} ref={scrollRef}>
                {myReview && (
                  <ReviewComponent
                    review={myReview}
                    isMine={true}
                    onClickUpdate={onClickUpdate}
                    onDeleteReview={handleDeleteReview}
                    onClickReviewLike={onClickReviewLike}
                  />
                )}
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <ReviewComponent
                      key={index}
                      review={review}
                      isMine={false}
                      onClickUpdate={onClickUpdate}
                      onDeleteReview={handleDeleteReview}
                      onClickReviewLike={onClickReviewLike}
                    />
                  ))
                ) : myReview ? (
                  <></>
                ) : (
                  <div className={styles.loader}>
                    작성된 리뷰가 없습니다.
                    <br /> 장소를 방문하셨다면 리뷰를 남겨보세요 !
                  </div>
                )}
                {reviewFetchLoading && (
                  <div className={styles.overContainer}>
                    <ChatLoader />
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
      <Modal openModal={openReview} modal={modal} width="35rem" height="40rem">
        <MakeReview
          openModal={openReview}
          locationId={locationId}
          onMakeReview={handleMakeReview}
          onUpdateReview={handleUpdateReview}
          isUpdate={isUpdate}
          {...(myReview ? { myReview } : {})}
        />
      </Modal>
      <Toast
        content={
          user.userId === 0
            ? '로그인하여 더 많은 기능을 이용해 보세요 !'
            : '리뷰는 가게당 1개만 가능합니다'
        }
        toast={toast}
        openToast={openToast}
        toastType="warning"
      />
    </div>
  );
};

export default PlaceInfo;
