import styled, { keyframes } from 'styled-components';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';

export const ToastContainer = styled.div<{
  toast: string;
}>`
  position: fixed;
  width: 100%;
  height: 10rem;
  visibility: ${({ toast }) => (toast === 'true' ? 'display' : 'hidden')};
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  animation: ${({ toast }) =>
    toast === 'true' ? 'fade 3s ease-in-out' : 'none'};

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
    box-shadow: 1px 4px 5px 1px ${colorTheme.divider};
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
