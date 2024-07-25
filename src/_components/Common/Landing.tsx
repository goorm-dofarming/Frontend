import React from 'react';
import Image from 'next/image';
import Hat from '@/src/_assets/icons/hat_logo.png';
import styled, { keyframes } from 'styled-components';

const swing = keyframes`
  0%, 100% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(-15deg);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  height: 25rem;
  position: relative;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  animation: ${swing} 2s infinite ease-in-out;
`;

const Landing = () => {
  return (
    <LogoContainer>
      <StyledImage
        src={Hat}
        alt="hat"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </LogoContainer>
  );
};

export default Landing;
