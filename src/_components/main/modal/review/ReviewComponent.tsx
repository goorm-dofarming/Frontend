import React from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';

import { colorTheme } from '@/src/_styles/common/commonColorStyles';

// type
import { Review } from '@/src/types/aboutReview';

// icons
import Profile from '@/src/_assets/main/userProfile.svg';
import { FaPen } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import StarScore from './Star';

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
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
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
      .userName {
        font-weight: 900;
      }

      .userBtns {
        ${flex('space-between', 'center', 'row')};
        gap: 1rem;

        .userBtn {
          cursor: pointer;
          transition: transform 0.3s ease-in-out;

          > svg {
            fill: ${colorTheme.inputBorder};
          }

          &:hover {
            transform: scale(1.1);
          }
        }
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
`;

interface ReviewComponentProps {
  review: Review;
  isMine: boolean;
  onClickUpdate: () => void;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({
  review,
  isMine,
  onClickUpdate,
}) => {
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
    const month = date.getMonth() + 1; // padStart 제거
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

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
          {isMine && (
            <div className="userBtns">
              <div className="userBtn" onClick={onClickUpdate}>
                <FaPen />
              </div>
              <div className="userBtn">
                <FaTrashCan />
              </div>
            </div>
          )}
        </div>
        <div className="starArea">
          <div className="stars">
            <StarScore value={review.score} size={1} />
          </div>
          <div className="date">{getDate(review.createdAt)}</div>
        </div>
        <div className="text">{review.content}</div>
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
    </ReviewContainer>
  );
};

export default ReviewComponent;
