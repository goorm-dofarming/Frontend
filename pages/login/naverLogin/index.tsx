import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// img
import Logo from '@/src/_assets/main/logo.svg';

// styles
import { SocialLoginContainer } from '@/src/_styles/kakaoLogin/kakaoLoginStyles';

// libraries
import { useCookies } from 'react-cookie';
import { useMutation } from '@tanstack/react-query';

// apis
import { getNaverUserData, signupSocialLogin } from '@/pages/api/auth';

// components
import Landing from '@/src/_components/Common/Landing';

const Page = () => {
  const router = useRouter();
  const [, setCookies] = useCookies(['token']);

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

      const response = await getNaverUserData(params);

      // console.log(response);

      const body2 = {
        socialType: 'NAVER',
        data: response.data,
      };

      const signupNaver = await signupSocialLogin(body2);

      // console.log('signupNaver: ', signupNaver);

      if (signupNaver.status === 200) {
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
      return signupNaver.data;
    },
    onSuccess: (data) => {
      setCookies('token', data.access_token, { path: '/' });
    },
    onError: (error) => {
      console.error('Error fetching access token:', error);
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
