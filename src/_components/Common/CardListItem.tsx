import React, { SetStateAction, Dispatch, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { IoHeartSharp } from "react-icons/io5"; //꽉찬하트
import { Recommend, DataType } from "@/src/types/aboutMap";
import main_logo from "@/src/_assets/icons/main_logo.png";
import { colorTheme } from "@/src/_styles/common/commonColorStyles";
const Container = styled.div`
  padding: 8px;
  width: 344px;
  height: 84px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-radius: 4px;
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
    drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
  cursor: pointer;
`;
const LocationImage = styled.div`
  width: 20%;
  height: 100%;
  > img {
    border-radius: 4px;
    object-fit: fill;
    width: 68px;
    height: 68px;
  }
  .logo {
    object-fit: contain;
    width: 68px;
    height: 68px;
  }
`;

const Description = styled.div`
  width: 70%;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 12px;
  gap: 1px;
  overflow: hidden;
  .title {
    font-size: 16px;
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
  justify-content: center;
  > svg {
    cursor: pointer;
    fill: ${colorTheme.secondary};
    /* fill: #fe0b62; */
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
const CardListItem = ({
  recommend,
  onClick,
}: {
  recommend: Recommend;
  onClick?: (recommend: Recommend) => void;
}) => {
  // TODO: heart animation
  const { id, image, title, dataType, addr, tel, countLikes } = recommend;
  const [hover, setHover] = useState(false);

  return (
    <Container onClick={() => onClick && onClick(recommend)}>
      <LocationImage>
        {image ? (
          <Image width={68} height={68} src={image} alt={title} />
        ) : (
          <Image
            width={68}
            height={68}
            className="logo"
            src={main_logo}
            alt={title}
          />
        )}
      </LocationImage>
      <Description>
        <p className="title">{title}</p>
        <div className="type">{DataType[dataType].type}</div>
        <div className="address">{addr}</div>
        <div className="phone">{`☎️: ${tel || "준비중"} `}</div>
      </Description>
      <Likes>
        <IoHeartSharp
          fontSize={26}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        />

        <div className="likesNumber">{formatNumber(countLikes)}</div>
      </Likes>
    </Container>
  );
};

export default CardListItem;
