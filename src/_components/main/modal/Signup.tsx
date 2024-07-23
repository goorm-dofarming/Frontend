import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// img
import ShowPwd from '@/src/_assets/main/eye.svg';
import HidePwd from '@/src/_assets/main/eye-closed.svg';
import KakaoLogo from '@/src/_assets/main/kakao.svg';
import NaverLogo from '@/src/_assets/main/N.svg';
import GoogleLogo from '@/src/_assets/main/g-logo.svg';

// styles
import {
  GoogleCircleButton,
  KakaoCircleButton,
  NAverCircleButton,
  SignupButton,
  SignupDisActiveButton,
} from '@/src/_styles/common/buttons';

// styles
import {
  InputSignupAuthpBorder,
  InputSignupBorder,
} from '@/src/_styles/common/inputs';

// libraries
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { inputDataType } from '@/src/types/aboutMain';

// apis
import { checkEmail, sendEmail, signUp } from '@/pages/api/auth';

interface SignupType {
  inputData: inputDataType;
  pwdShow: boolean;
  handlePwd: () => void;
  handleInputData: (sort: string, value: string) => void;
  handleComponent: () => void;
  setPageState: React.Dispatch<React.SetStateAction<boolean>>;
}
const Signup = ({
  inputData,
  pwdShow,
  handlePwd,
  handleInputData,
  handleComponent,
  setPageState,
}: SignupType) => {
  // input data
  const { email, password, confirmPassword, authentication } = inputData;
  // 인증 버튼 컨트롤
  const [isCertificate, setIsCertificate] = useState<boolean>(false);
  // 회원가입 버튼 컨트롤
  const [isActive, setIsActive] = useState<boolean>(false);
  // 타이머
  const MINUTES_IN_MS = 3 * 61 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isCertificate === true) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - INTERVAL);
      }, INTERVAL);
      console.log('timer:', timer);
      console.log('timeLeft:', timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [timeLeft]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    '0'
  );
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  const doSignup = useMutation({
    mutationKey: ['signup'],
    mutationFn: async () => {
      const body = {
        email,
        password,
        confirmPassword,
      };

      const response = await signUp(body);
      console.log('create user success: ', response);

      if (response.status === 201) {
        setPageState(false);
      }
      return response;
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

  const certification = useMutation({
    mutationKey: ['certification'],
    mutationFn: async () => {
      const body = {
        email,
      };

      const response = await sendEmail(body);
      console.log('email certification: ', response);

      if (response.status === 204) {
        setIsCertificate(true);
        setTimeLeft((prev) => prev - 3 * INTERVAL);
      }
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

  const signup = useMutation({
    mutationKey: ['signup'],
    mutationFn: async () => {
      const body = {
        email,
        emailNumber: authentication,
      };

      const response = await checkEmail(body);

      console.log('email certification: ', response);
      if (response.status === 204) {
        setIsActive(true);
      }
    },
    onError: (e) => {
      console.log(e.message);
    },
  });
  return (
    <div className="modalContents">
      <InputSignupBorder>
        <div
          style={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div className="inputInMent">Email</div>
          <div className="inputRow">
            <input
              name="email"
              onChange={(e) => handleInputData(e.target.name, e.target.value)}
              placeholder="이메일을 입력해주세요"
            />
          </div>
        </div>
      </InputSignupBorder>
      <InputSignupBorder>
        <div
          style={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div className="inputInMent">Password</div>
          <div className="inputRow">
            <input
              type={pwdShow === true ? 'text' : 'password'}
              name="password"
              onChange={(e) => handleInputData(e.target.name, e.target.value)}
              placeholder="비밀번호를 입력해주세요(8~12자)"
            />
          </div>
        </div>
        <Image
          src={pwdShow === true ? HidePwd : ShowPwd}
          alt="비밀번호 확인"
          width={25}
          height={25}
          onClick={handlePwd}
        />
      </InputSignupBorder>
      <InputSignupBorder>
        <div
          style={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div className="inputInMent" style={{ marginBottom: '0.3rem' }}>
            Check Password
          </div>
          <div className="inputRow">
            <input
              type={pwdShow === true ? 'text' : 'password'}
              name="confirmPassword"
              onChange={(e) => handleInputData(e.target.name, e.target.value)}
              placeholder="비밀번호 확인"
            />
          </div>
        </div>
      </InputSignupBorder>
      <div className="authContainer">
        <InputSignupAuthpBorder>
          <div
            style={{
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div className="inputInMent">Authentication</div>
            <div className="inputRow">
              <input
                name="authentication"
                onChange={(e) => handleInputData(e.target.name, e.target.value)}
              />
            </div>
          </div>
        </InputSignupAuthpBorder>
        {isCertificate === true ? (
          <button onClick={() => signup.mutate()}>확인</button>
        ) : (
          <button onClick={() => certification.mutate()}>인증</button>
        )}
      </div>
      <div className="limitTime">
        <span>
          {password !== confirmPassword && password.length > 7
            ? '비밀번호가 틀립니다❌'
            : null}
        </span>
        <span>{isCertificate === true && `${minutes}:${second}`}</span>
      </div>
      {/* 회원가입 버튼 */}
      {isActive === true ? (
        <SignupButton onClick={() => doSignup.mutate()}>회원 가입</SignupButton>
      ) : (
        <SignupDisActiveButton>회원 가입</SignupDisActiveButton>
      )}
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
