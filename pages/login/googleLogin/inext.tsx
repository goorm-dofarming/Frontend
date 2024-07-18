import Image from 'next/image';

// img
import Logo from '@/src/_assets/main/logo.svg';

// styles
import { SocialLoginContainer } from '@/src/_styles/kakaoLogin/kakaoLoginStyles';

const inext = () => {
  return (
    <SocialLoginContainer>
      <Image src={Logo} alt="로고" />
    </SocialLoginContainer>
  );
};

export default inext;
