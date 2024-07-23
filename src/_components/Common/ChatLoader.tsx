import React from 'react';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';
import styled, { keyframes } from 'styled-components';

// 키프레임 애니메이션 정의
const rotate = keyframes`
  0% {
    transform: rotate(0deg) scale(0.8);
  }
  50% {
    transform: rotate(360deg) scale(1.2);
  }
  100% {
    transform: rotate(720deg) scale(0.8);
  }
`;

const ball1 = keyframes`
  0% {
    box-shadow: 30px 0 0 ${colorTheme.primary};
  }
  50% {
    box-shadow: 0 0 0 ${colorTheme.primary};
    margin-bottom: 0;
    transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 ${colorTheme.primary};
    margin-bottom: 10px;
  }
`;

const ball2 = keyframes`
  0% {
    box-shadow: 30px 0 0 ${colorTheme.teritiary};
  }
  50% {
    box-shadow: 0 0 0 ${colorTheme.teritiary};
    margin-top: -20px;
    transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 ${colorTheme.teritiary};
    margin-top: 0;
  }
`;

const Loader = styled.span`
  animation: ${rotate} 1s infinite;
  height: 50px;
  width: 50px;

  &::before,
  &::after {
    border-radius: 50%;
    content: '';
    display: block;
    height: 20px;
    width: 20px;
  }

  &::before {
    animation: ${ball1} 1s infinite;
    background-color: ${colorTheme.teritiary};
    box-shadow: 30px 0 0 ${colorTheme.primary};
    margin-bottom: 10px;
  }

  &::after {
    animation: ${ball2} 1s infinite;
    background-color: ${colorTheme.primary};
    box-shadow: 30px 0 0 ${colorTheme.teritiary};
  }
`;

const ChatLoader = () => {
  return <Loader />;
};

export default ChatLoader;
