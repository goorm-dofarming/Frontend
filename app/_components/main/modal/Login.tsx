import React, { useContext } from 'react';
import Image from 'next/image';
// img
import ShowPwd from '@/app/_assets/main/eye.svg';
import HidePwd from '@/app/_assets/main/eye-closed.svg';
import KakaoLogo from '@/app/_assets/main/kakao.svg';
import NaverLogo from '@/app/_assets/main/N.svg';
import GoogleLogo from '@/app/_assets/main/g-logo.svg';

//styles
import {
  GoogleButton,
  KakaoButton,
  ModalLoginButton,
  NaverButton,
} from '@/app/_styles/main/mainStyles';
import { contextData } from '@/app/page';
interface LoginType {
  handleComponent: () => void;
}
const Login = ({ handleComponent }: LoginType) => {
  const { pwdShow, handlePwd, handleInputData } = useContext(contextData);
  return (
    <div className="modalContents">
      <div className="inputBorder">
        <div>Email</div>
        <div className="inputRow">
          <input
            name="email"
            onChange={(e) => handleInputData(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <div className="inputBorder2">
        <div>Password</div>
        <div className="inputRow">
          <input
            type={pwdShow === true ? 'text' : 'password'}
            name="password"
            onChange={(e) => handleInputData(e.target.name, e.target.value)}
          />
          <Image
            src={pwdShow === true ? HidePwd : ShowPwd}
            alt="비밀번호 확인"
            width={25}
            height={25}
            onClick={handlePwd}
          />
        </div>
      </div>
      <ModalLoginButton>로그인</ModalLoginButton>
      <div className="socialContainer">
        <div className="line" />
        <div className="text">소셜 로그인</div>
        <div className="line" />
      </div>

      <div className="socialButtonContainer">
        <KakaoButton>
          <Image src={KakaoLogo} alt="kakao" style={{ paddingLeft: '0rem' }} />
          <span>카카오 로그인</span>
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
          </span>
        </KakaoButton>
        <NaverButton>
          <Image src={NaverLogo} alt="kakao" style={{ paddingLeft: '0rem' }} />
          <span>네이버 로그인</span>
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
          </span>
        </NaverButton>
        <GoogleButton>
          <Image src={GoogleLogo} alt="kakao" style={{ paddingLeft: '0rem' }} />
          <span>구글 로그인</span>
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
          </span>
        </GoogleButton>
      </div>
      <div>
        <span className="ment">아직 회원이 아니신가요?</span>
        <span className="ment2" onClick={handleComponent}>
          회원가입
        </span>
      </div>
    </div>
  );
};

export default Login;
