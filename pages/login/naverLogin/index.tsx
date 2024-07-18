import Image from 'next/image';
import { useEffect } from 'react';

// img
import Logo from '@/src/_assets/main/logo.svg';

// styles
import { SocialLoginContainer } from '@/src/_styles/kakaoLogin/kakaoLoginStyles';

// libraries
import { useCookies } from 'react-cookie';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const page = () => {
  const [cookies, setCookies] = useCookies(['token']);

  const getAccesstoken = useMutation({
    mutationKey: ['getAccesstoken'],
    mutationFn: async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      const state = new URL(window.location.href).searchParams.get('state');
      const params = {
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
        code: code,
        state: state,
      };

      const response = await axios.get('/api/callback', { params });

      console.log(response);

      const body2 = {
        socialType: 'NAVER',
        data: response.data,
      };

      const signupNaver = await axios.post(
        `${process.env.NEXT_PUBLIC_DEPLOY_API_ADDRESS}/oauth`,
        body2
      );

      console.log('signupNaver: ', signupNaver);

      return response.data;
    },
    onSuccess: (data) => {
      setCookies('token', data.access_token, { path: '/' });
    },
    onError: (error) => {
      console.error('Error fetching access token:', error);
    },
  });

  useEffect(() => {
    getAccesstoken.mutate();
  }, []);
  return (
    <SocialLoginContainer>
      <Image src={Logo} alt="로고" />
    </SocialLoginContainer>
  );
};

export default page;
