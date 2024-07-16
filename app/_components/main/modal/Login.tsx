import React from 'react';
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
} from '@/app/_styles/main/buttons';
import { InputLoginBorder, InputPwdBorder } from '@/app/_styles/main/inputs';

// libraries
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'react-cookie';

// types
import { inputDataType } from '@/app/types/aboutMain';

interface LoginType {
  inputData: inputDataType;
  pwdShow: boolean;
  handlePwd: () => void;
  handleInputData: (sort: string, value: string) => void;
  handleComponent: () => void;
}
const Login = ({
  inputData,
  pwdShow,
  handlePwd,
  handleInputData,
  handleComponent,
}: LoginType) => {
  const [cookies, setCookies] = useCookies(['token']);
  // const { inputData, pwdShow, handlePwd, handleInputData, handleComponent } =
  //   useContext(contextData);
  const { email, password } = inputData;

  const doLogin = useMutation({
    mutationFn: async () => {
      const body = {
        email,
        password,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/login`,
        body
      );

      console.log('login success: ', response);

      if (response.status === 200) {
        // 성공 시 cookie에 token 추가
        setCookies('token', response.data);
      }
    },
    onError: (e) => {
      console.log(e.message);
    },
  });
  return (
    <div className="modalContents">
      <InputLoginBorder>
        <div>Email</div>
        <div className="inputRow">
          <input
            name="email"
            onChange={(e) => handleInputData(e.target.name, e.target.value)}
          />
        </div>
      </InputLoginBorder>
      <InputPwdBorder className="inputBorder2">
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
      </InputPwdBorder>
      <ModalLoginButton onClick={() => doLogin.mutate()}>
        로그인
      </ModalLoginButton>
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
