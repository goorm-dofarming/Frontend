import React from 'react';
import Image from 'next/image';
import Hat from '@/src/_assets/icons/hat_logo.png';
import styled, { keyframes, css } from 'styled-components';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';

const getRotationAngle = (index: number) => {
  const angles = [-50, -40, -30, -20, 0, 20, 30, 40, 50];
  return angles[index % angles.length];
};

const getTranslationY = (index: number) => {
  const translations = [100, 60, 30, 10, 0, 10, 30, 60, 100];
  return translations[index % translations.length];
};

const getTranslationX = (index: number) => {
  const translations = [35, 15, 5, 0, 0, 0, -5, -15, -35];
  return translations[index % translations.length];
};

const bounce = (index: number) => keyframes`
  0%, 30% {
    transform: translateY(${getTranslationY(index)}px) translateX(${getTranslationX(index)}px) rotate(${getRotationAngle(index)}deg);
  }
  10% {
    transform: translateY(${getTranslationY(index) - 25}px) translateX(${getTranslationX(index)}px) rotate(${getRotationAngle(index)}deg);
  }

  20% {
    transform: translateY(${getTranslationY(index) + 10}px) translateX(${getTranslationX(index)}px) rotate(${getRotationAngle(index)}deg);
  }
  100% {
    transform: translateY(${getTranslationY(index)}px) translateX(${getTranslationX(index)}px) rotate(${getRotationAngle(index)}deg);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  max-width: 400px;
  height: 50%;
  position: relative;
  flex-direction: column;
  gap: 10px;

  .logo {
    font-size: 3rem;
    font-weight: 900;
    color: ${colorTheme.logoBrownText};
    font-family: 'NanumBarunGothic';
    display: flex;
    gap: 5px;
  }

  .hatContainer {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .hat {
    object-fit: contain;
    position: relative;
  }
`;

interface LetterProps {
  $index: number;
}

const Letter = styled.span<LetterProps>`
  width: 3rem;
  text-align: center;
  ${(props) => css`
    transform: translateY(${getTranslationY(props.$index)}px)
      translateX(${getTranslationX(props.$index)}px)
      rotate(${getRotationAngle(props.$index)}deg);
    animation: ${bounce(props.$index)} 3s linear infinite;
    animation-delay: ${props.$index * 0.2}s; // 인덱스에 따라 지연 시간 추가
    animation-fill-mode: forwards; // 애니메이션 완료 후 마지막 상태 유지
  `}
`;

const Landing = () => {
  const text = 'DOFARMING';
  return (
    <LogoContainer>
      <div className="logo">
        {text.split('').map((letter, index) => (
          <Letter key={index} $index={index}>
            {letter}
          </Letter>
        ))}
      </div>
      <div className="hatContainer">
        <Image
          src={Hat}
          alt="hat"
          className="hat"
          fill
          sizes="(max-width: 500px) 100vw, 50vw"
          priority
        />
      </div>
    </LogoContainer>
  );
};

export default Landing;
