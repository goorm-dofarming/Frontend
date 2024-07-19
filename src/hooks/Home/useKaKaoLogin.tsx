import axios from 'axios';

const useKaKaoLogin = () => {
  function kakaoLogin() {
    const restAPIKeys = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectURI = process.env.NEXT_PUBLIC_KAKAO_REDIREDCT_URI;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${restAPIKeys}&redirect_uri=${redirectURI}&response_type=code`;

    window.location.href = KAKAO_AUTH_URL;
  }
  return kakaoLogin;
};

export default useKaKaoLogin;
