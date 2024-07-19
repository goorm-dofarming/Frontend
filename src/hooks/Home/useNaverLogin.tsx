const useNaverLogin = () => {
  function naverLogin() {
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const state = process.env.NEXT_PUBLIC_NAVER_STATE;
    const redirectURI = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_NAVER_REDIREDCT_URI}`
    );

    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectURI}`;

    window.location.href = NAVER_AUTH_URL;
  }

  return naverLogin;
};

export default useNaverLogin;
