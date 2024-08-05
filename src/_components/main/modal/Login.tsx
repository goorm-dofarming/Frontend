import React, { useEffect, useState } from "react";
import Image from "next/image";
// img
import ShowPwd from "@/src/_assets/main/eye.svg";
import HidePwd from "@/src/_assets/main/eye-closed.svg";
import KakaoLogo from "@/src/_assets/main/kakao.svg";
import NaverLogo from "@/src/_assets/main/N.svg";
import { FcGoogle } from "react-icons/fc";

//styles
import {
  GoogleButton,
  KakaoButton,
  ModalLoginButton,
  NaverButton,
} from "@/src/_styles/common/buttons";
import { InputLoginBorder, InputPwdBorder } from "@/src/_styles/common/inputs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
// libraries
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGoogleLogin } from "@react-oauth/google";

// types
import { inputDataType } from "@/src/types/aboutMain";

// hooks
import useKaKaoLogin from "@/src/hooks/Home/useKaKaoLogin";
import useNaverLogin from "@/src/hooks/Home/useNaverLogin";

// apis
import { getGoogleUserData, login, signupSocialLogin } from "@/pages/api/auth";
import cx from "classnames";
interface LoginType {
  inputData: inputDataType;
  pwdShow: boolean;
  handlePwd: () => void;
  handleInputData: (sort: string, value: string) => void;
  handleComponent: () => void;
  openModal: () => void;
}
type ChangingType = "email" | "password";
const Login = ({
  inputData,
  pwdShow,
  handlePwd,
  handleInputData,
  handleComponent,
  openModal,
}: LoginType) => {
  const [, setCookies] = useCookies(["token"]);
  // 구글 로그인 토큰
  const [gToken, setGToken] = useState<string>("");
  const { email, password } = inputData;
  const [ischanging, setIsChanging] = useState<ChangingType | null>(null);

  const doLogin = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      const body = {
        email,
        password,
      };

      const response = await login(body);

      // console.log("login success: ", response);

      if (response.status === 200) {
        // 성공 시 cookie에 token 추가
        setCookies("token", response.data);
        openModal();
      }
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

  const NaverLogin = () => {
    const naver = useNaverLogin();
    naver();
  };

  const gLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // console.log("토큰 발급 성공: ", tokenResponse);

      setGToken(tokenResponse.access_token);
    },
    onError: (errorResponse) => console.log("Error: ", errorResponse),
  });

  const googleLogin = useMutation({
    mutationKey: ["googleLogin"],
    mutationFn: async () => {
      const headers = {
        Authorization: `Bearer ${gToken}`,
      };
      const userResponse = await getGoogleUserData(headers);
      // console.log("userResponse:", userResponse);

      const body = {
        socialType: "GOOGLE",
        data: userResponse.data,
      };

      const signupGoogle = await signupSocialLogin(body);
      setCookies('token', signupGoogle.data, {
        path: '/',
        sameSite: 'none',
        secure: true,
      });
      //console.log('signupGoogle: ', signupGoogle);

      if (signupGoogle.status === 200) {
        openModal();
      }
      return signupGoogle.data;
    },
    onError: (error) => {
      console.error("Error fetching access token:", error);
    },
  });

  const KakaoLogin = () => {
    const kLogin = useKaKaoLogin();
    kLogin();
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (gToken) {
      googleLogin.mutate();
    }
  }, [gToken]);
  /* eslint-enable react-hooks/exhaustive-deps */
  return (
    <div className="modalContents" style={{ gap: "16px" }}>
      <InputLoginBorder ischanging={ischanging}>
        <div
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4px",
          }}
          // className={ischanging === "email" ? "activeInput" : ""}
        >
          <div className="inputInMent">Email</div>
          <div className="inputRow">
            <input
              name="email"
              onChange={(e) => {
                handleInputData(e.target.name, e.target.value);
                setIsChanging("email");
              }}
              onBlur={() => setIsChanging(null)}
            />
          </div>
        </div>
      </InputLoginBorder>
      <InputPwdBorder ischanging={ischanging}>
        <div
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          <div className="inputInMent">Password</div>
          <div className="inputRow">
            <input
              type={pwdShow === true ? "text" : "password"}
              name="password"
              onChange={(e) => {
                handleInputData(e.target.name, e.target.value);
                setIsChanging("password");
              }}
              onBlur={() => setIsChanging(null)}
            />
          </div>
        </div>
        <Image
          src={pwdShow === true ? HidePwd : ShowPwd}
          alt="비밀번호 확인"
          width={30}
          height={30}
          onClick={handlePwd}
          style={{ cursor: "pointer" }}
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
        <KakaoButton onClick={KakaoLogin}>
          <div className="btn">
            <RiKakaoTalkFill size={36} fill="#000000" />
          </div>

          <span>카카오 로그인</span>
          <span></span>
        </KakaoButton>
        <NaverButton onClick={NaverLogin}>
          <div className="btn">
            <SiNaver size={24} fill="#FFFFFF" />
          </div>

          <span>네이버 로그인</span>
          <span></span>
        </NaverButton>
        <GoogleButton onClick={() => gLogin()}>
          <div className="btn">
            <FcGoogle size={36} />
          </div>

          <span className="loginText">구글 로그인</span>
          <span></span>
        </GoogleButton>
      </div>
      <div style={{ paddingTop: "1rem" }}>
        <span className="ment">아직 회원이 아니신가요?</span>
        <span className="ment2" onClick={handleComponent}>
          회원가입
        </span>
      </div>
    </div>
  );
};

export default Login;
