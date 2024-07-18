import React, { useEffect, useState } from 'react';
import Image from 'next/image';
// img
import ShowPwd from '@/src/_assets/main/eye.svg';
import HidePwd from '@/src/_assets/main/eye-closed.svg';
import KakaoLogo from '@/src/_assets/main/kakao.svg';
import NaverLogo from '@/src/_assets/main/N.svg';
import GoogleLogo from '@/src/_assets/main/g-logo.svg';

//styles
import {
  GoogleButton,
  KakaoButton,
  ModalLoginButton,
  NaverButton,
} from '@/src/_styles/main/buttons';
import { InputLoginBorder, InputPwdBorder } from '@/src/_styles/main/inputs';

// libraries
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useGoogleLogin } from '@react-oauth/google';

// types
import { inputDataType } from '@/src/types/aboutMain';

// hooks
import useKaKaoLogin from '@/src/hooks/Home/useKaKaoLogin';
import useNaverLogin from '@/src/hooks/Home/useNaverLogin';

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
  // 구글 로그인 토큰
  const [gToken, setGToken] = useState<string>('');
  const { email, password } = inputData;

  const doLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: async () => {
      const body = {
        email,
        password,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DEPLOY_API_ADDRESS}/login`,
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

  const naverLogin = () => {
    const naver = useNaverLogin();
    naver();
  };

  const gLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('토큰 발급 성공: ', tokenResponse);
      setCookies('token', tokenResponse.access_token, { path: '/' });
      setGToken(tokenResponse.access_token);
    },
    onError: (errorResponse) => console.log('Error: ', errorResponse),
  });

  const googleLogin = useMutation({
    mutationKey: ['googleLogin'],
    mutationFn: async () => {
      const userResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
        {
          headers: {
            Authorization: `Bearer ${gToken}`,
          },
        }
      );

      console.log('userResponse:', userResponse);

      const body = {
        socialType: 'GOOGLE',
        data: userResponse.data,
      };

      const signupGoogle = await axios.post(
        `${process.env.NEXT_PUBLIC_DEPLOY_API_ADDRESS}/oauth`,
        body
      );

      console.log('signupKakao: ', signupGoogle);

      return signupGoogle;
    },
    onError: (error) => {
      console.error('Error fetching access token:', error);
    },
  });

  const kakaoLogin = useMutation({
    mutationKey: ['kakaologin'],
    mutationFn: async () => {
      const kakaoLogin = useKaKaoLogin();
      kakaoLogin();
    },
  });

  useEffect(() => {
    if (gToken) {
      googleLogin.mutate();
    }
  }, [gToken]);
  return (
    <div className="modalContents">
      <InputLoginBorder>
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
            />
          </div>
        </div>
      </InputLoginBorder>
      <InputPwdBorder>
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
            />
          </div>
        </div>
        <Image
          src={pwdShow === true ? HidePwd : ShowPwd}
          alt="비밀번호 확인"
          width={30}
          height={30}
          onClick={handlePwd}
        />
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
        <KakaoButton onClick={() => kakaoLogin.mutate()}>
          <Image src={KakaoLogo} alt="kakao" style={{ paddingLeft: '0rem' }} />
          <span>카카오 로그인</span>
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
          </span>
        </KakaoButton>
        <NaverButton onClick={naverLogin}>
          <Image src={NaverLogo} alt="kakao" style={{ paddingLeft: '0rem' }} />
          <span>네이버 로그인</span>
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
          </span>
        </NaverButton>
        <GoogleButton onClick={() => gLogin()}>
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
