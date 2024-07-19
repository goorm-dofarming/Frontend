const useGoogleLogin = () => {
  function googleLogin() {
    const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirect_uri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
    const scope = process.env.NEXT_PUBLIC_GOOGLE_SCOPE;
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`;

    window.location.href = googleOAuthUrl;
  }
  return googleLogin;
};

export default useGoogleLogin;
