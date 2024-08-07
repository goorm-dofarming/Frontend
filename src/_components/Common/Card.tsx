import React, { SetStateAction, Dispatch, useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { IoHeartSharp } from 'react-icons/io5'; //꽉찬하트
import { Recommend, DataType } from '@/src/types/aboutMap';
import main_logo from '@/src/_assets/icons/main_logo.png';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';
import cx from 'classnames';
import useToggle from '@/src/hooks/Home/useToggle';
import { userState, randomPinState } from '@/src/atom/stats';
import { useRecoilState } from 'recoil';
import Toast from '@/src/_components/Common/Toast';
import { modifyLike } from '@/pages/api/map';
import { FaStar } from 'react-icons/fa';

const Container = styled.div`
  padding: 8px 4px;
  width: 300px;
  height: 300px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-radius: 8px;
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
    drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
  cursor: pointer;
  &:hover {
    transform: translateY(-12px);
    transition: transform 0.3s ease-in-out;
  }
`;
const LocationImage = styled.div`
  width: 96%;
  height: 160px;
  > img {
    object-fit: fill;
    width: 100%;
    height: 160px;
  }
  .logo {
    object-fit: contain;
    width: 100%;
    height: 160px;
  }
`;

const Info = styled.div`
  border-top: 1px solid #cacaca;
  width: 98%;
  height: 140px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 4px;
  /* gap:8px; */
  .btns {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 8px;
  }
`;
const Description = styled.div`
  width: 80%;
  height: 100%;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 14px;
  gap: 4px;
  .title {
    font-size: 20px;
    height: 24px;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* text-overflow: hidden; */
  }
  .type {
    font-weight: 500;
  }
  .address {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    /* transition: all 3s ease-in-out; */
  }
  .phone {
    overflow: hidden;
    font-weight: 200;
  }
`;

const Star = styled.div`
  width: 46%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  .starNumber {
    margin-top: 1px;
    font-weight: 600;
    font-size: 12px;
  }
`;
const Likes = styled.div`
  width: 46%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  .likeBtn {
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    > svg {
      width: 100%;
      height: 100%;
      cursor: pointer;
      stroke: ${colorTheme.secondary};
      stroke-width: 8px;
      transition: fill 0.3s ease-in-out;
    }
  }
  .active {
    > svg {
      fill: ${colorTheme.secondary};
    }
    &:hover,
    :active {
      > svg {
        fill: white;
      }
    }
  }
  .inactive {
    > svg {
      fill: white;
    }
    &:hover,
    :active {
      > svg {
        fill: ${colorTheme.secondary};
      }
    }
  }

  .likesNumber {
    font-weight: 600;
    font-size: 12px;
  }
`;
const formatNumber = (num: number) => {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};
const Card = ({
  recommend,
  onClick,
  refetch,
}: {
  recommend: Recommend;
  onClick?: (recommend: Recommend) => void;
  refetch?: () => void;
}) => {
  // TODO: heart animation
  const {
    locationId,
    image,
    title,
    dataType,
    addr,
    tel,
    countLikes,
    liked,
    averageScore,
    totalReview,
  } = recommend;
  const [toast, setToast] = useState<boolean>(false);
  const openToast = useToggle(toast, setToast);
  const [user, setUser] = useRecoilState(userState);
  const onClickLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //NOTE: 하트 눌렀을때 action을 카드밖에서 인자로 넘겨줘야할듯!
    // 데이터를 불러서 어디저장할지, 다시 리다이렉트를 어떤 데이터를 해야할지 카드 내부 에선 모르기때문
    //좋아요페이지, 맵페이지, 로그페이지
    e.preventDefault(); // 링크의 기본 동작 방지
    if (!user.userId) {
      openToast();
      return;
    }
    const response = await modifyLike(locationId);
    if (response.status === 200 && refetch) {
      refetch();
    }
  };

  return (
    <Container onClick={() => onClick && onClick(recommend)}>
      <LocationImage>
        {image ? (
          <Image width={280} height={240} src={image} alt={title} />
        ) : (
          <Image
            width={280}
            height={240}
            className="logo"
            src={main_logo}
            alt={title}
          />
        )}
      </LocationImage>
      <Info>
        <Description>
          <span className="title">{title}</span>
          <div className="type">{DataType[dataType].type}</div>
          <div className="address">{addr}</div>
          <div className="phone">{`☎️: ${tel || '준비중'} `}</div>
        </Description>
        <div className="btns">
          {totalReview !== 0 && (
            <Star>
              <FaStar fontSize={29} fill={'#F9E400'} />
              <div className="starNumber">{averageScore}</div>
            </Star>
          )}
          <Likes>
            <button
              onClick={onClickLike}
              className={cx(
                'likeBtn',
                { ['active']: liked },
                { ['inactive']: !liked }
              )}
            >
              <IoHeartSharp fontSize={30} />
            </button>
            <div className="likesNumber">{formatNumber(countLikes)}</div>
          </Likes>
        </div>
      </Info>
      {user.userId === 0 && (
        <Toast
          content={'로그인하여 더 많은 기능을 이용해 보세요 !'}
          toast={toast}
          openToast={openToast}
        />
      )}
    </Container>
  );
};

export default Card;
