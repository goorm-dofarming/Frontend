'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';

// img
import Logo from '@/app/_assets/main/logo.svg';

// styles
import { SocialLoginContainer } from '@/app/_styles/kakaoLogin/kakaoLoginStyles';

// libraries
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

const page = () => {
  const [cookies, setCookies] = useCookies(['kakaoToken']);

  const getAccesstoken = useMutation({
    mutationKey: ['getAccesstoken'],
    mutationFn: async () => {
      const kakaoCode = new URL(window.location.href).searchParams.get('code'); //인가코드

      const body = {
        client_id: process.env.NEXT_PUBLIC_KAKAO_OAUTH_KEY,
        grant_type: 'authorization_code',
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIREDCT_URI,
        code: kakaoCode,
      };
      const token = await axios.post(
        `https://kauth.kakao.com/oauth/token`,
        body,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log('get token:', token.data);
      const { access_token } = token.data;

      const userData = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log('user data:', userData.data);

      const body2 = {
        socialType: 'KAKAO',
        data: userData.data,
      };

      const signupKakao = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/oauth`,
        body2
      );

      console.log('signupKakao: ', signupKakao);

      setCookies('kakaoToken', signupKakao.data, { path: '/' });
      return signupKakao;
    },
  });

  useEffect(() => {
    getAccesstoken.mutate();
  }, []);
  return (
    <SocialLoginContainer>
      <div>
        <Image src={Logo} alt="로고" />
      </div>
    </SocialLoginContainer>
  );
};

export default page;
