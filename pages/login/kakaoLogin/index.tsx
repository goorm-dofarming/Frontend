import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// styles
import { SocialLoginContainer } from '@/src/_styles/kakaoLogin/kakaoLoginStyles';

// libraries
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

// apis
import {
  getKakaoAccessToken,
  getKaKaoUserData,
  signupSocialLogin,
} from '@/pages/api/auth';

// components
import Landing from '@/src/_components/Common/Landing';

const Page = () => {
  const router = useRouter();
  const [, setCookie] = useCookies(['token']);

  const getAccesstoken = useMutation({
    mutationKey: ['getAccesstoken'],
    mutationFn: async () => {
      const kakaoCode = new URL(window.location.href).searchParams.get('code'); //인가코드

      const body = {
        client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
        grant_type: 'authorization_code',
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIREDCT_URI,
        code: kakaoCode,
      };

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const token = await getKakaoAccessToken(body, headers);

      const { access_token } = token.data;

      const userDataHeader = {
        Authorization: `Bearer ${access_token}`,
      };

      const userData = await getKaKaoUserData(userDataHeader);

      const signupKakaoBody = {
        socialType: 'KAKAO',
        data: userData.data,
      };

      const signupKakao = await signupSocialLogin(signupKakaoBody);

      setCookie('token', signupKakao.data, {
        path: '/',
      });

      if (signupKakao.status === 200) {
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
      return signupKakao.data;
    },
  });

  /* eslint-enable react-hooks/exhaustive-deps */
  useEffect(() => {
    getAccesstoken.mutate();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return (
    <SocialLoginContainer>
      <Landing />
    </SocialLoginContainer>
  );
};

export default Page;
