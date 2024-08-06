import React, { useEffect, useState } from 'react';
import styles from '@/src/_components/main/modal/review/placeinfo.module.scss';
import Image from 'next/image';
import cx from 'classnames';

// icons
import { IoHeartSharp } from 'react-icons/io5';
import Profile from '@/src/_assets/main/userProfile.svg';
import mainLogo from '@/src/_assets/icons/main_logo.png';

// components
import Modal from '@/src/_components/Common/Modal';
import MakeReview from './MakeReview';
import StarScore from './Star';
import ChatLoader from '@/src/_components/Common/ChatLoader';
import Landing from '@/src/_components/Common/Landing';
import Toast from '@/src/_components/Common/Toast';

// hooks
import useToggle from '@/src/hooks/Home/useToggle';

// types
import { LocationInfo, Review } from '@/src/types/aboutReview';

// api
import axios from 'axios';
import { getLocationData, getReviewData, makeReview } from '@/pages/api/review';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginToast, setLoginToast] = useState<boolean>(false);
  const openLoginToast = useToggle(loginToast, setLoginToast);
  const [reviewToast, setReviewToast] = useState<boolean>(false);
  const openReviewToast = useToggle(reviewToast, setReviewToast);

  const getImageUrl = (url: string) => {
    if (url && !url.startsWith('http') && !url.startsWith('https')) {
      return `${process.env.NEXT_PUBLIC_DEPLOY_PROFILE_IMAGE_ADDRESS}/${url}`;
    }
    return url;
  };

  const getReviews = async () => {
    const myParams = {
      myReview: true,
      locationId,
      sortType: sortTypes[selectedSort],
    };

    const params = {
      myReview: false,
      locationId,
      sortType: sortTypes[selectedSort],
    };

    if (locationId === 0 || locationId === undefined) return;

    const controller = new AbortController(); // AbortController 생성
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 후 요청 취소

    try {
      setReviewLoading(true);

      const myResponse = await getReviewData(myParams);
      console.log(myResponse);

      const response = await getReviewData(params);
      clearTimeout(timeoutId); // 요청이 성공하면 타이머를 취소
      console.log(response);
      setMyReview(myResponse[0]);
      setReviews(response);
      setTimeout(() => {
        setReviewLoading(false);
        setIsLoading(false);
      }, 1500);

      console.log('reviews: ', reviews);
    } catch (error) {
      clearTimeout(timeoutId); // 에러 발생 시 타이머를 취소

      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_CANCELED') {
          console.log('Request was canceled due to timeout');
          // 요청이 취소된 경우, 재시도 로직을 여기에 작성할 수 있습니다.
          getReviews(); // 요청을 다시 시작
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

  const getLocation = async () => {
    try {
      if (locationId === 0 || locationId === undefined) return;
      if (locationId !== location?.locationId) {
        setIsLoading(true);
      }
      const response = await getLocationData(locationId);
      console.log(response);
      setLocation(response);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const getDate = (inputDate: Date) => {
    const date = inputDate instanceof Date ? inputDate : new Date(inputDate);

    if (isNaN(date.getTime())) {
      return;
    }
    date.setHours(date.getHours() + 9);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // padStart 제거
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  const onClickSort = (number: number) => {
    setSelectedSort(number);
  };

  const onClickLike = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // 링크의 기본 동작 방지
    if (!user.userId) {
      openLoginToast();
      return;
    }
    const response = await modifyLike(locationId);
    if (response.status === 200) {
      getLocation();
      if (refetch) refetch();
    }
  };

  useEffect(() => {
    getLocation();
  }, [locationId]);

  useEffect(() => {
    getReviews();
  }, [selectedSort, locationId]);

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
              backgroundImage: `url(${location?.image})`,
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
                    <IoHeartSharp size={'1.5rem'} className={styles.heart} />
                  </div>
                  {location?.countLikes}
                </div>
              </div>
              <div className={styles.address}>{location?.addr}</div>
              <div className={styles.telephone}>
                {location?.tel !== '' && `Tel : ${location?.tel}`}
              </div>
            </div>
            {location?.totalReview && location?.totalReview > 0 ? (
              <div className={styles.rightSection}>
                <div className={styles.titleText2}>평점</div>
                <div className={styles.gradeText}>
                  {Math.round(location?.averageScore * 10) / 10}
                </div>
                <div className={styles.stars}>
                  <StarScore
                    value={
                      location?.averageScore
                        ? Math.round(location.averageScore * 10) / 10
                        : 0
                    }
                    size={3}
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
                  onClick={
                    user.userId === 0
                      ? openLoginToast
                      : location?.isReviewed
                        ? openReviewToast
                        : openReview
                  }
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
              <div className={styles.reviewArea}>
                {myReview && (
                  <>
                    {/* <div className={styles.myReviewTitle}>내가 작성한 리뷰</div> */}
                    <div className={cx(styles.review, styles.myReview)}>
                      <div className={styles.userImage}>
                        <Image
                          src={
                            myReview.user?.imageUrl
                              ? getImageUrl(myReview.user.imageUrl)
                              : Profile
                          }
                          alt="유저 프로필"
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ objectFit: 'cover', borderRadius: '50%' }}
                        />
                      </div>
                      <div className={styles.textArea}>
                        <div className={styles.topContainer}>
                          <div className={styles.userName}>
                            {myReview.user?.nickname}
                          </div>
                          <div className={styles.userBtns}>
                            <div className={styles.userBtn}>수정</div>
                            <div className={styles.userBtn}>삭제</div>
                          </div>
                        </div>
                        <div className={styles.starArea}>
                          <div className={styles.stars}>
                            <StarScore value={myReview.score} size={1} />
                          </div>
                          <div className={styles.date}>
                            {getDate(myReview.createdAt)}
                          </div>
                        </div>
                        <div className={styles.text}>{myReview.content}</div>
                        <div className={styles.images}>
                          {myReview.images &&
                            myReview.images.map((image, index) => (
                              <div className={styles.image} key={index}>
                                <Image
                                  src={image.imageUrl}
                                  alt="이미지"
                                  fill
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  style={{
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                  }}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div className={styles.review} key={index}>
                      <div className={styles.userImage}>
                        <Image
                          src={
                            review.user?.imageUrl
                              ? getImageUrl(review.user.imageUrl)
                              : Profile
                          }
                          alt="유저 프로필"
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ objectFit: 'cover', borderRadius: '50%' }}
                        />
                      </div>
                      <div className={styles.textArea}>
                        <div className={styles.userName}>
                          {review.user?.nickname}
                        </div>
                        <div className={styles.starArea}>
                          <div className={styles.stars}>
                            <StarScore value={review.score} size={1} />
                          </div>
                          <div className={styles.date}>
                            {getDate(review.createdAt)}
                          </div>
                        </div>
                        <div className={styles.text}>{review.content}</div>
                        <div className={styles.images}>
                          {review.images &&
                            review.images.map((image, index) => (
                              <div className={styles.image} key={index}>
                                <Image
                                  src={image.imageUrl}
                                  alt="이미지"
                                  fill
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  style={{
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                  }}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.loader}>
                    작성된 리뷰가 없습니다.
                    <br /> 장소를 방문하셨다면 리뷰를 남겨보세요 !
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
        />
      </Modal>
      {user.userId === 0 && (
        <Toast
          content={'로그인하여 더 많은 기능을 이용해 보세요 !'}
          toast={loginToast}
          openToast={openLoginToast}
          toastType="warning"
        />
      )}
      <Toast
        content={'리뷰는 가게당 1개만 가능합니다'}
        toast={reviewToast}
        openToast={openReviewToast}
        toastType="warning"
      />
    </div>
  );
};

export default PlaceInfo;
