'use client';
import styled from 'styled-components';
import { loginLoading } from '../keyframes';

export const SocialLoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    animation: 1s ${loginLoading};
    animation-iteration-count: infinite;
  }
`;
