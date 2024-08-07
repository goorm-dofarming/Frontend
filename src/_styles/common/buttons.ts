import styled from "styled-components";
import { colorTheme } from "@/src/_styles/common/commonColorStyles";

export const LoginButton = styled.button`
  width: 10vw;
  height: 5vh;
  color: ${colorTheme.primary};
  border: 1px solid ${colorTheme.secondary};
  background-color: white;
  border-radius: 0.2rem;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: white;
    border: 1px solid ${colorTheme.secondary};
    background-color: ${colorTheme.primary};
    /* cursor: pointer; */
  }
  transition:  background-color, color 0.3s ease-in-out;
`;

export const SignupButton = styled.button`
  width: 23vw;
  height: 7vh;
  color: white;
  border: 1px solid ${colorTheme.secondary};
  background-color: ${colorTheme.secondary};
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    color: ${colorTheme.secondary};
    border: 1px solid ${colorTheme.secondary};
    background-color: white;
  }
  transition:  background-color, color 0.3s ease-in-out;
`;

export const SignupDisActiveButton = styled.button`
  width: 23vw;
  height: 7vh;
  color: #c1c1c1;
  border: 1px solid #c1c1c1;
  background-color: #d2d1d1;
  border-radius: 0.2rem;
  font-weight: 700;
`;

export const ModalLoginButton = styled.button`
  width: 23vw;
  height: 7vh;
  /* margin-top: 1rem; */
  background-color: ${colorTheme.secondary};
  color: white;
  border: none;
  font-size: 1.2rem;
  border-radius: 0.3rem;
  cursor: pointer;
  &:hover {
    border: 1px solid ${colorTheme.secondary};
    background-color: white;
    color: ${colorTheme.secondary};

  }
  transition:  background-color, color 0.3s ease-in-out;
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
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  > .btn {
    background: none;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loginText {
    width: 6rem;
    text-align: center;
  }
`;

export const KakaoButton = styled(SocialButton)`
  color: rgba(0, 0, 0, 0.85);
  background-color: #fee500;
  border: 2px solid #fee500;
`;

export const NaverButton = styled(SocialButton)`
  color: white;
  background-color: #03c75a;
  border: 2px solid #03c75a;
`;

export const GoogleButton = styled(SocialButton)`
  color: gray;
  background-color: white;
`;

const SocialBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

export const KakaoCircleButton = styled(SocialBtn)`
  background-color: #fee500;
`;

export const NAverCircleButton = styled(SocialBtn)`
  background-color: #03c75a;
`;

export const GoogleCircleButton = styled(SocialBtn)`
  background-color: white;
`;
