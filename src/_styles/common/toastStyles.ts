import styled, { keyframes } from 'styled-components';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';

interface ToastContainerProps {
  $toast: string;
}

export const ToastContainer = styled.div<ToastContainerProps>`
  position: fixed;
  width: 100%;
  height: 10rem;
  visibility: ${(props) => (props.$toast === 'true' ? 'display' : 'hidden')};
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  animation: ${(props) =>
    props.$toast === 'true' ? 'fade 3s ease-in-out' : 'none'};

  .toast {
    width: auto;
    height: 4rem;
    margin-top: 1rem;
    padding: 1rem;
    background-color: ${colorTheme.white};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* box-shadow: 1px 4px 5px 1px rgba(0,0,0,0.5); */
    filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
      drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
  }

  .toast > svg {
    padding-bottom: 0.2rem;
  }

  .content {
    opacity: 1;
    font-weight: 900;
    padding-left: 0.2rem;
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
