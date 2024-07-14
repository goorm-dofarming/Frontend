import React, { useContext } from 'react';
import Image from 'next/image';

// img
import ShowPwd from '@/app/_assets/main/eye.svg';
import HidePwd from '@/app/_assets/main/eye-closed.svg';
import KakaoLogo from '@/app/_assets/main/kakao.svg';
import NaverLogo from '@/app/_assets/main/N.svg';
import GoogleLogo from '@/app/_assets/main/g-logo.svg';
import {
  GoogleCircleButton,
  KakaoCircleButton,
  NAverCircleButton,
  SignupButton,
} from '@/app/_styles/main/mainStyles';

// contextAPI
import { contextData } from '@/app/page';

interface SignupType {
  handleComponent: () => void;
}
const Signup = ({ handleComponent }: SignupType) => {
  const { pwdShow, handlePwd, handleInputData } = useContext(contextData);
  return (
    <div className="modalContents">
      <div className="inputSignupBorder">
        <div>Email</div>
        <div className="inputRow">
          <input
            name="email"
            onChange={(e) => handleInputData(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <div className="inputSignupBorder">
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
      <div className="inputSignupBorder">
        <div>Check Password</div>
        <div className="inputRow">
          <input
            type={pwdShow === true ? 'text' : 'password'}
            name="checkPassword"
            onChange={(e) => handleInputData(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <div className="inputSignupBorder" style={{ marginBottom: '0' }}>
        <div>Authentication</div>
        <div className="inputRow">
          <input
            type="password"
            name="authentication"
            onChange={(e) => handleInputData(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <div>
        <span>03분00초</span>
      </div>
      {/* 회원가입 버튼 */}
      <SignupButton>회원 가입</SignupButton>
      <div className="socialContainer">
        <div className="line" />
        <div className="text">소셜 로그인</div>
        <div className="line" />
      </div>
      {/* 소셜 로그인 */}
      <div className="signupSocialContainer">
        <KakaoCircleButton>
          <Image src={KakaoLogo} alt="카카오버튼" />
        </KakaoCircleButton>
        <NAverCircleButton>
          <Image src={NaverLogo} alt="네이버버튼" />
        </NAverCircleButton>
        <GoogleCircleButton>
          <Image src={GoogleLogo} alt="구글버튼" />
        </GoogleCircleButton>
      </div>
      {/* ment */}
      <div>
        <span className="ment">이미</span>
        <span className="ment3">도파밍</span>
        <span className="ment">회원이신가요?</span>
        <span className="ment2" onClick={handleComponent}>
          로그인
        </span>
      </div>
    </div>
  );
};

export default Signup;
