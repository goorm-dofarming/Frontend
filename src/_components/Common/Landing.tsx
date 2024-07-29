import React from 'react';
import Image from 'next/image';
import Hat from '@/src/_assets/icons/main_logo.png';
import styled, { keyframes } from 'styled-components';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';

// 모자를 그네 타듯이 회전하는 애니메이션
const swing = keyframes`
  0%, 100% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-10deg);
  }
`;

// 로고 컨테이너 스타일 정의
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  max-width: 400px;
  height: 50%;
  position: relative;
  flex-direction: column;
`;

// 이미지를 스타일링하고 애니메이션 적용
const StyledImage = styled(Image)`
  object-fit: contain;
  animation: ${swing} 2s infinite ease-in-out;
`;

// 랜딩 컴포넌트
const Landing = () => {
  return (
    <LogoContainer>
      <StyledImage
        src={Hat}
        alt="hat"
        fill
        sizes="(max-width: 500px) 100vw, 50vw"
      />
    </LogoContainer>
  );
};

export default Landing;
