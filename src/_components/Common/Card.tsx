import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { IoHeartSharp } from "react-icons/io5"; //꽉찬하트
import { Recommend, DataType } from "@/src/types/aboutMap";
import main_logo from "@/src/_assets/icons/main_logo.png";
import { colorTheme } from "@/src/_styles/common/commonColorStyles";
import cx from "classnames";
import useToggle from "@/src/hooks/Home/useToggle";
import { userState, randomPinState } from "@/src/atom/stats";
import { useRecoilState } from "recoil";
import Toast from "@/src/_components/Common/Toast";
import { modifyLike } from "@/pages/api/map";
import { getLogData } from "@/pages/api/log";

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
  width: 96%;
  height: 140px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 4px;
`;
const Description = styled.div`
  width: 90%;
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
    text-overflow: hidden;
  }
  .type {
    font-weight: 500;
  }
  .address {
    width: 100%;
    white-space: nowrap;
    overflow-y: hidden;
    text-overflow: ellipsis;
    display: block;
    /* transition: all 3s ease-in-out; */
    &:hover {
      text-overflow: initial;
      white-space: nowrap;
      overflow: visible;
    }
  }
  .phone {
    font-weight: 200;
  }
`;

const Likes = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
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
    return (num / 1e6).toFixed(1) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};
const Card = ({
  recommend,
  onClick,
}: {
  recommend: Recommend;
  onClick?: (recommend: Recommend) => void;
}) => {
  // TODO: heart animation
  const { id, image, title, dataType, addr, tel, countLikes, liked } =
    recommend;
  const [randomPin, setRandomPin] = useRecoilState(randomPinState);
  const [hover, setHover] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [toast, setToast] = useState<boolean>(false);
  const openToast = useToggle(toast, setToast);
  const [user, setUser] = useRecoilState(userState);
  const onClickLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 링크의 기본 동작 방지
    if (!user.userId) {
      openToast();
      return;
    }
    const response = await modifyLike(id, dataType);
    if (response.status === 200) {
      setIsLiked((prev) => !prev);
      const logResponse = await getLogData(randomPin.logId);
      if (response.status === 200) {
        setRandomPin((prev) => ({
          ...prev,
          recommends: [...logResponse.data],
        }));
      }
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
          <div className="phone">{`☎️: ${tel || "준비중"} `}</div>
        </Description>
        <Likes>
          <button
            onClick={onClickLike}
            className={cx(
              "likeBtn",
              { ["active"]: isLiked },
              { ["inactive"]: !isLiked }
            )}
          >
            <IoHeartSharp fontSize={30} />
          </button>
          <div className="likesNumber">{formatNumber(countLikes)}</div>
        </Likes>
      </Info>
      {!user.userId && (
        <Toast
          content={"로그인하여 더 많은 기능을 이용해 보세요 !"}
          toast={toast}
          openToast={openToast}
        />
      )}
    </Container>
  );
};

export default Card;
