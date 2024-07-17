import styled from "styled-components";
import { colorTheme } from "../common/commonColorStyles";

export const LoginButton = styled.button<{ modal: boolean }>`
  width: 10vw;
  height: 5vh;
  color: ${colorTheme.primary};
  border: 1px solid ${colorTheme.secondary};
  background-color: ${({ modal }) =>
    modal === true ? colorTheme.modelOpenBg : "white"};
  border-radius: 0.2rem;
  font-family: "RedHatDisplay_Italic";
  font-size: 24px;
  &:hover {
    color: white;
    border: 1px solid ${colorTheme.secondary};
    background-color: ${colorTheme.primary};
    cursor: pointer;
  }
`;

export const SignupButton = styled.button`
  width: 23vw;
  height: 7vh;
  color: white;
  border: 1px solid ${colorTheme.secondary};
  background-color: ${colorTheme.secondary};
  border-radius: 0.2rem;
  font-family: "RedHatDisplay_Italic";

  &:hover {
    color: ${colorTheme.secondary};
    border: 1px solid ${colorTheme.secondary};
    background-color: white;
  }
`;

export const SignupDisActiveButton = styled.button`
  width: 23vw;
  height: 7vh;
  color: #c1c1c1;
  border: 1px solid #c1c1c1;
  background-color: #d2d1d1;
  border-radius: 0.2rem;
  font-family: "RedHatDisplay_Italic";
  font-weight: 700;
`;

export const ModalLoginButton = styled.button`
  width: 23vw;
  height: 7vh;
  margin-top: 1rem;
  background-color: ${colorTheme.secondary};
  color: white;
  border: none;
  font-size: 1.2rem;
  border-radius: 0.3rem;

  &:hover {
    border: 1px solid ${colorTheme.secondary};
    background-color: white;
    color: ${colorTheme.secondary};
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
  font-family: "RedHatDisplay_Variable";
`;

export const NaverButton = styled(SocialButton)`
  color: white;
  background-color: #62b645;
  font-size: 1.1rem;
  font-family: "RedHatDisplay_Variable";
`;

export const GoogleButton = styled(SocialButton)`
  justify-content: space-around;
  border: 1px solid #9c9c9c;
  color: #9c9c9c;
  background-color: white;
  font-size: 1.1rem;
  font-family: "RedHatDisplay_Variable";
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
