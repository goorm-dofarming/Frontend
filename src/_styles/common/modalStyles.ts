import styled from 'styled-components';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';

export const ModalContainer = styled.div<{
  modal: string;
  width: string;
  height: string;
}>`
  position: fixed;
  width: 100%;
  height: 100%;
  visibility: ${({ modal }) => (modal === 'true' ? 'visible' : 'hidden')};
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    z-index: 1;
    background-color: white;
    border-radius: 0.5rem;
  }

  .modalContents {
    height: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'RedHatDisplay_Variable';
  }

  .limitTime {
    width: 23vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    span {
      color: ${colorTheme.primary};
      font-family: 'RedHatDisplay_Variable';
    }
  }
  .socialContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 20px 0;
  }

  .line {
    width: 8vw;
    height: 1px;
    background-color: #ccc;
  }

  .text {
    margin: 0 10px;
    font-size: 16px;
    color: #aaa;
  }

  .ment {
    color: #8e8e8e;
    font-size: 0.8rem;
    font-family: 'RedHatDisplay_Variable';
  }
  .ment2 {
    color: #8e8e8e;
    font-weight: 800;
    font-size: 0.9rem;
    font-family: 'RedHatDisplay_Variable';
    margin-left: 0.3rem;
    cursor: pointer;
  }
  .ment3 {
    color: ${colorTheme.primary};
    font-size: 0.8rem;
    font-family: 'RedHatDisplay_Variable';
  }

  .signupSocialContainer {
    width: 23vw;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 0.6rem;
  }

  .authContainer {
    width: 23vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;

    button {
      width: 3vw;
      height: 60%;
      border: 1px solid ${colorTheme.primary};
      color: ${colorTheme.primary};
      background-color: white;
      border-radius: 0.2rem;

      &:hover {
        cursor: pointer;
        color: white;
        background-color: ${colorTheme.primary};
      }
    }
  }

  .logo {
    z-index: 0;
    cursor: pointer;
    font-size: 28px;
  }
  .modalHeader {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 32px;
    position: relative;
    z-index: 100;
    text-shadow:
      1px 1px 0 white,
      -1px -1px 0 white,
      1px -1px 0 white,
      -1px 1px 0 white;
    padding-right: 10px;
  }

  .socialButtonContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 32%;
  }
`;
