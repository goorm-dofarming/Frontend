'use client';
import Image from 'next/image';

// img
import Logo from '@/app/_assets/main/logo.svg';

// styles
import { SocialLoginContainer } from '@/app/_styles/kakaoLogin/kakaoLoginStyles';
import { useCookies } from 'react-cookie';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

const page = () => {
  const [cookies, setCookies] = useCookies(['NaverToken']);

  const getAccesstoken = useMutation({
    mutationKey: ['getAccesstoken'],
    mutationFn: async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      const state = new URL(window.location.href).searchParams.get('state');
      const request = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET}&code=${code}&state=${state}`;

      window.location.href = request;

      console.log(request);

      // console.log('get token:', token);
      // const { access_token } = token.data;

      // const userData = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      //   headers: {
      //     Authorization: `Bearer ${access_token}`,
      //   },
      // });

      // console.log('user data:', userData.data);

      // const body2 = {
      //   socialType: 'KAKAO',
      //   data: userData.data,
      // };

      // const signupKakao = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_ADDRESS}/oauth`,
      //   body2
      // );

      // console.log('signupKakao: ', signupKakao);

      // setCookies('NaverToken', signupKakao.data, { path: '/' });
      // return token;
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
