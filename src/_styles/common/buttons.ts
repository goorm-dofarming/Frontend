import styled from 'styled-components';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';

export const LoginButton = styled.button`
  width: 10vw;
  height: 5vh;
  color: ${colorTheme.primary};
  border: 1px solid ${colorTheme.secondary};
  background-color: white;
  border-radius: 0.2rem;
  font-size: 20px;
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
  cursor: pointer;

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
    cursor: pointer;
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
  font-size: 1.1rem;
  cursor: pointer;

  .loginText {
    width: 6rem;
    text-align: center;
  }
`;

export const KakaoButton = styled(SocialButton)`
  background-color: #f8dd08;
  border: 2px solid #f8dd08;
`;

export const NaverButton = styled(SocialButton)`
  background-color: #1ac049;
  border: 2px solid #1ac049;
`;

export const GoogleButton = styled(SocialButton)`
  background-color: white;
  border: 2px solid #9c9c9c;
`;

const SocialBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

export const KakaoCircleButton = styled(SocialBtn)`
  background-color: #f8dd08;
`;

export const NAverCircleButton = styled(SocialBtn)`
  background-color: #1ac049;
`;

export const GoogleCircleButton = styled(SocialBtn)`
  background-color: white;
`;
