const useNaverLogin = () => {
  function naverLogin() {
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&state=${process.env.NEXT_PUBLIC_NAVER_STATE}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIREDCT_URI}`;

    window.location.href = NAVER_AUTH_URL;
  }

  return naverLogin;
};

export default useNaverLogin;
