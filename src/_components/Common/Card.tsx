import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { IoHeartSharp } from 'react-icons/io5'; //꽉찬하트
import { IoHeartOutline } from 'react-icons/io5'; //빈하트

type Card = {
  id: number;
  imgUrl: string;
  name: string;
  type: string;
  location: string;
  phone: string;
};
const Container = styled.div`
  padding: 4px;
  width: 300px;
  height: 260px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-radius: 8px;
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
    drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
  margin-bottom: 0.6rem;
`;
const LocationImage = styled.div`
  width: 92%;
  height: 160px;
  > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Description = styled.div`
  width: 92%;
  border-top: 1px solid #cacaca;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 12px;
  gap: 4px;
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
const Card = ({ id, imgUrl, name, type, location, phone }: Card) => {
  // TODO: heart animation
  const [hover, setHover] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const onClickLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <Container>
      <LocationImage>
        <Image width={280} height={240} src={imgUrl} alt={name} />
      </LocationImage>
      <Description>
        <Title>
          <span>{name}</span>
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
        <div>{type}</div>
        <div>{location}</div>
        <div className="phone">{phone}</div>
      </Description>
    </Container>
  );
};

export default Card;
