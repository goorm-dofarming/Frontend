import styled, { css } from 'styled-components';
import { colorTheme } from '../common/commonColorStyles';
import { hideHomeIcons, showHomeIcons } from '../keyframes';

export const HomeContainer = styled.div<{ dropdown: boolean; modal: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${({ modal }) => modal === true && colorTheme.modelOpenBg};
  header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 1.5rem;
  }
  main {
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .logoContainer {
    top: 40%;
    right: 24%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .iconCol {
    position: absolute;
    right: 1.8%;
    height: 23vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    animation: ${({ dropdown }) =>
      dropdown === true
        ? css`0.5s ${showHomeIcons} ease-in-out`
        : css`0.5s ${hideHomeIcons} ease-in-out`};
    transition: 0.3s visibility;
    visibility: ${({ dropdown }) => (dropdown === true ? 'visible' : 'hidden')};
  }
  .modal {
    position: absolute;
    width: 35vw;
    height: 75vh;
    z-index: 1;
    top: 15%;
    background-color: white;
    border-radius: 0.5rem;
    visibility: ${({ modal }) => (modal === true ? 'visible' : 'hidden')};
  }
  .logo {
    z-index: 0;
  }
  .modalHeader {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .modalContents {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .inputBorder {
    width: 23vw;
    height: 7vh;
    border: 1px solid ${colorTheme.inputBorder};
    border-radius: 0.3rem 0.3rem 0 0;
    padding: 0.2rem 0.2rem 0.2rem 0.4rem;
    input {
      width: 90%;
      outline: none;
      border: none;
      font-family: 'RedHatDisplay_Variable';
    }
    div {
      font-size: 0.8rem;
      font-family: 'RedHatDisplay_Variable';
    }
    &:hover {
      border: 1px solid ${colorTheme.primaryColor};
    }
    .inputRow {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  .inputSignupBorder {
    width: 23vw;
    height: 7vh;
    border: 1px solid ${colorTheme.inputBorder};
    border-radius: 0.5rem;
    padding: 0.2rem 0.2rem 0.2rem 0.4rem;
    margin-bottom: 1rem;
    input {
      width: 90%;
      outline: none;
      border: none;
      font-family: 'RedHatDisplay_Variable';
    }
    div {
      font-size: 0.8rem;
      font-family: 'RedHatDisplay_Variable';
    }
    &:hover {
      border: 1px solid ${colorTheme.primaryColor};
    }
    .inputRow {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  .inputBorder2 {
    width: 23vw;
    height: 7vh;
    display: flex;
    flex-direction: column;
    border: 1px solid ${colorTheme.inputBorder};
    border-radius: 0 0 0.3rem 0.3rem;
    padding: 0.2rem 0.2rem 0.2rem 0.4rem;
    input {
      width: 90%;
      outline: none;
      border: none;
      font-family: 'RedHatDisplay_Variable';
    }
    div {
      font-size: 0.8rem;
      font-family: 'RedHatDisplay_Variable';
    }
    &:hover {
      border: 1px solid ${colorTheme.primaryColor};
    }
    .inputRow {
      display: flex;
      flex-direction: row;
      align-items: center;
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
  .socialButtonContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 32%;
  }
  .ment {
    color: #bdb8b8;
    font-size: 0.8rem;
    font-family: 'RedHatDisplay_Variable';
  }
  .ment2 {
    color: #bdb8b8;
    font-weight: 800;
    font-size: 0.9rem;
    font-family: 'RedHatDisplay_Variable';
    margin-left: 0.3rem;
  }
  .ment3 {
    color: ${colorTheme.primaryColor};
    font-size: 0.8rem;
    font-family: 'RedHatDisplay_Variable';
  }
  .signupSocialContainer {
    width: 23vw;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const LoginButton = styled.button<{ modal: boolean }>`
  width: 10vw;
  height: 5vh;
  color: ${colorTheme.primaryColor};
  border: 1px solid ${colorTheme.secondaryColor};
  background-color: ${({ modal }) =>
    modal === true ? colorTheme.modelOpenBg : 'white'};
  border-radius: 0.2rem;
  font-family: 'RedHatDisplay_Italic';

  &:hover {
    color: white;
    border: 1px solid ${colorTheme.secondaryColor};
    background-color: ${colorTheme.primaryColor};
  }
`;

export const SignupButton = styled.button`
  width: 23vw;
  height: 7vh;
  color: white;
  border: 1px solid ${colorTheme.secondaryColor};
  background-color: ${colorTheme.secondaryColor};
  border-radius: 0.2rem;
  font-family: 'RedHatDisplay_Italic';

  &:hover {
    color: ${colorTheme.secondaryColor};
    border: 1px solid ${colorTheme.secondaryColor};
    background-color: white;
  }
`;

export const Input = styled.input`
  outline: none;
  border: none;
`;

export const ModalLoginButton = styled.button`
  width: 23vw;
  height: 7vh;
  margin-top: 1rem;
  background-color: ${colorTheme.secondaryColor};
  color: white;
  border: none;
  font-size: 1.2rem;
  border-radius: 0.3rem;

  &:hover {
    border: 1px solid ${colorTheme.secondaryColor};
    background-color: white;
    color: ${colorTheme.secondaryColor};
  }
`;

const SocialButton = styled.div`
  width: 23vw;
  height: 7vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.3rem;

  font-weight: 700;
`;

export const KakaoButton = styled(SocialButton)`
  color: white;
  background-color: #fee500;
  font-size: 1.1rem;
  font-family: 'RedHatDisplay_Variable';
`;

export const NaverButton = styled(SocialButton)`
  color: white;
  background-color: #62b645;
  font-size: 1.1rem;
  font-family: 'RedHatDisplay_Variable';
`;

export const GoogleButton = styled(SocialButton)`
  justify-content: space-around;
  border: 1px solid #9c9c9c;
  color: #9c9c9c;
  background-color: white;
  font-size: 1.1rem;
  font-family: 'RedHatDisplay_Variable';
`;

const SocialBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3vw;
  height: 6vh;
  border-radius: 50%;
`;

export const KakaoCircleButton = styled(SocialBtn)`
  background-color: #fee500;
`;

export const NAverCircleButton = styled(SocialBtn)`
  background-color: #62b645;
`;

export const GoogleCircleButton = styled(SocialBtn)`
  background-color: white;
`;
