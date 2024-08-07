import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import cx from 'classnames';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';

// type
import { Review } from '@/src/types/aboutReview';

// icons
import Profile from '@/src/_assets/main/userProfile.svg';
import { FaPen } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { IoHeartSharp } from 'react-icons/io5';

// components
import StarScore from './Star';
import Modal from '@/src/_components/Common/Modal';
import DeleteReview from './DeleteReview';

// hooks
import useToggle from '@/src/hooks/Home/useToggle';

export const flex = (
  justify = 'flex-start',
  align = 'flex-start',
  direction = 'row'
) => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
`;

const ReviewContainer = styled.div`
  ${flex('flex-start', 'flex-start', 'row')};
  width: 98%;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid ${colorTheme.divider};

  .userImage {
    width: 2rem;
    height: 2rem;
    position: relative;
  }

  .textArea {
    ${flex('flex-start', 'flex-start', 'column')};
    flex: 1;
    padding: 0.5rem;
    gap: 0.4rem;

    .topContainer {
      ${flex('space-between', 'flex-start', 'row')};
      width: 100%;
      gap: 1rem;

      .userName {
        font-weight: 900;
      }
    }

    .starArea {
      ${flex('flex-start', 'center', 'row')};
      gap: 1rem;

      .date {
        font-size: 0.6rem;
        color: ${colorTheme.inputBorder};
      }
    }

    .text {
      margin: 0;
      color: black;
      font-size: 1rem;
    }

    .images {
      ${flex('flex-start', 'flex-start', 'row')};
      gap: 0.5rem;

      .image {
        position: relative;
        width: 6rem;
        height: 6rem;
      }
    }
  }

  .buttonContainer {
    ${flex('flex-start', 'flex-start', 'row')};
    margin-left: auto;
    font-size: 0.8rem;
    padding: 0.5rem;
    gap: 1rem;

    .userBtns {
      ${flex('space-between', 'center', 'row')};
      gap: 1rem;

      .userBtn {
        cursor: pointer;
        transition: transform 0.3s ease-in-out;
        padding-top: 2px;

        > svg {
          fill: ${colorTheme.inputBorder};
        }

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .likeContainer {
      ${flex('space-between', 'center', 'column')};

      .heart {
        cursor: pointer;
        stroke: ${colorTheme.secondary};
        stroke-width: 10px;
        transition: fill 0.3s ease-in-out;
      }

      .activeHeart {
        fill: ${colorTheme.secondary};
      }

      .inactiveHeart {
        fill: white;
        &:hover {
          fill: ${colorTheme.secondary};
        }
      }
    }
  }
`;

interface ReviewComponentProps {
  review: Review;
  isMine: boolean;
  onClickUpdate: () => void;
  onDeleteReview: (reviewId: number) => void;
  onClickReviewLike: (reviewId: number) => void;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({
  review,
  isMine,
  onClickUpdate,
  onDeleteReview,
  onClickReviewLike,
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const openModal = useToggle(modal, setModal);

  const getImageUrl = (url: string) => {
    if (url && !url.startsWith('http') && !url.startsWith('https')) {
      return `${process.env.NEXT_PUBLIC_DEPLOY_PROFILE_IMAGE_ADDRESS}/${url}`;
    }
    return url;
  };

  const getDate = (inputDate: Date) => {
    const date = inputDate instanceof Date ? inputDate : new Date(inputDate);

    if (isNaN(date.getTime())) {
      return;
    }
    date.setHours(date.getHours() + 9);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  const iconClass = cx({
    activeHeart: review.liked,
    inactiveHeart: !review.liked,
  });

  return (
    <ReviewContainer>
      <div className="userImage">
        <Image
          src={
            review.user?.imageUrl ? getImageUrl(review.user.imageUrl) : Profile
          }
          alt="유저 프로필"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover', borderRadius: '50%' }}
        />
      </div>
      <div className="textArea">
        <div className="topContainer">
          <div className="userName">{review.user?.nickname}</div>
        </div>
        <div className="starArea">
          <div className="stars">
            <StarScore value={review.score} size={1} />
          </div>
          <div className="date">
            {review.createdAt === review.updatedAt
              ? getDate(review.createdAt)
              : `${getDate(review.updatedAt)} 수정됨`}
          </div>
        </div>
        <div className="text">
          {review.content.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <div className="images">
          {review.images &&
            review.images.map((image, index) => (
              <div className="image" key={index}>
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
      <div className="buttonContainer">
        {isMine && (
          <div className="userBtns">
            <div className="userBtn" onClick={onClickUpdate}>
              <FaPen size={'1rem'} />
            </div>
            <div className="userBtn" onClick={openModal}>
              <FaTrashCan size={'1rem'} />
            </div>
          </div>
        )}
        <div className="likeContainer">
          <IoHeartSharp
            size={'1.5rem'}
            className={cx(iconClass, 'heart')}
            onClick={() => onClickReviewLike(review.reviewId)}
          />
          <div>{review.reviewLikeCount}</div>
        </div>
      </div>
      <Modal openModal={openModal} modal={modal} width="20rem" height="15rem">
        <DeleteReview
          openModal={openModal}
          reviewId={review.reviewId}
          onDeleteReview={onDeleteReview}
        />
      </Modal>
    </ReviewContainer>
  );
};

export default ReviewComponent;
