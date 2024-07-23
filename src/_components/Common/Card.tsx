import React, { SetStateAction, Dispatch, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { IoHeartSharp } from "react-icons/io5"; //꽉찬하트
import { IoHeartOutline } from "react-icons/io5"; //빈하트
import { Recommend, DataType } from "@/src/types/aboutMap";
import main_logo from "@/src/_assets/icons/main_logo.png";

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
    height: 100%;
  }
`;

const Description = styled.div`
  width: 96%;
  border-top: 1px solid #cacaca;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 14px;
  gap: 4px;
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
const Title = styled.div`
  width: 100%;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  .likes {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    > svg {
      cursor: pointer;
    }
    .likesNumber {
      font-weight: 600;
      font-size: 12px;
    }
  }
`;
const Card = ({
  recommend,
  onClick,
}: {
  recommend: Recommend;
  onClick: Dispatch<SetStateAction<Recommend | null >>;
}) => {
  // TODO: heart animation
  const { id, image, title, dataType, addr, tel } = recommend;
  const [hover, setHover] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const onClickLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <Container onClick={() => onClick(recommend)}>
      <LocationImage>
        <Image width={280} height={240} src={image || main_logo} alt={title} />
      </LocationImage>
      <Description>
        <Title>
          <span>{title}</span>
          <span className="likes">
            {/* <IoHeartSharp fill={"#FE0B62"} fontSize={26} /> */}
            <IoHeartOutline
              fontSize={26}
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            />
            {/* {hover ? (
              <IoHeartSharp
                fill={"#FE0B62"}
                fontSize={26}
                onMouseOver={() => setHover(false)}
                onMouseOut={() => setHover(true)}
              />
            ) : (
              <IoHeartOutline
                fontSize={26}
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
              />
            )} */}
            <div className="likesNumber">14K</div>
          </span>
        </Title>
        <div className="type">{DataType[dataType].type}</div>
        <div className="address">{addr}</div>
        <div className="phone">{`☎️: ${tel || "준비중"} `}</div>
      </Description>
    </Container>
  );
};

export default Card;
