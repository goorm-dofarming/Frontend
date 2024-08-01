import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
// styles
import { HomeContainer } from '@/src/_styles/main/mainStyles';

// constants
import { LoginButton } from '@/src/_styles/common/buttons';

// components
import Modal from '@/src/_components/Common/Modal';
import Login from '@/src/_components/main/modal/Login';
import Signup from '@/src/_components/main/modal/Signup';

// img
import ColorMap from '@/src/_assets/main/colored_Map.svg';
import Logo from '@/src/_assets/icons/hat_logo.png';
import pin_location from '@/src/_assets/main/map/pin_location.png';

// types
import { inputDataType } from '@/src/types/aboutMain';

// hooks
import useToggle from '@/src/hooks/Home/useToggle';
import { useCookies } from 'react-cookie';

const Main = ({ pin }: { pin: string }) => {
  // cookie
  const [cookies, setCookies] = useCookies(['token']);
  // 모달 컨트롤
  const [modal, setModal] = useState<boolean>(false);
  // 로그인 회원가입 페이지 컨트롤
  const [pageState, setPageState] = useState(false);
  // 비밀번호 show
  const [pwdShow, setPwdShow] = useState<boolean>(false);
  // input data
  const [inputData, setInputData] = useState<inputDataType>({
    email: '',
    password: '',
    confirmPassword: '',
    authentication: '',
  });
  const [showFog, setShowFog] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false); // 클라이언트 측 렌더링 여부 상태 추가

  const pinRef = useRef<HTMLImageElement>(null); // 핀 요소에 대한 ref

  const handlePwd = useToggle(pwdShow, setPwdShow);
  const handleComponent = useToggle(pageState, setPageState);
  const openModal = useToggle(modal, setModal);

  const handleInputData = (sort: string, value: string) => {
    setInputData((prev) => ({
      ...prev,
      [sort]: value,
    }));
  };

  useEffect(() => {
    setIsClient(true); // 클라이언트 렌더링 시점에 상태 업데이트
  }, []);

  useEffect(() => {
    const pinElement = pinRef.current;
    if (pinElement) {
      const handleAnimationEnd = () => {
        setShowFog(true);
      };
      pinElement.addEventListener('animationend', handleAnimationEnd);
      return () => {
        pinElement.removeEventListener('animationend', handleAnimationEnd);
        setShowFog(false);
      };
    }
  }, []);

  return (
    <HomeContainer modal={modal.toString()}>
      <div className={`fog ${showFog ? 'fog_show' : ''}`}></div>
      <main className="mainSection">
        <Image className="colorMap" src={ColorMap} alt="맵" width={360} />
        <div className="logoContainer">
          <div className="logo">
            <Image className="hatLogo" src={Logo} alt="로고" width={200} />
            {/* <div className="textLogo">DOFARMING</div> */}
            <svg className="textLogo" viewBox="0 0 500 100">
              <defs>
                <path
                  id="wave"
                  d="M 0 50 Q 250 10 500 50 T 1000 50"
                  fill="transparent"
                />
              </defs>
              <text
                font-size="60"
                font-weight="700"
                fill="#3D0007"
                text-anchor="middle"
                dominant-baseline="middle"
              >
                <textPath xlinkHref="#wave" startOffset="25%">
                  DOFARMING
                </textPath>
              </text>
            </svg>
          </div>
          {isClient &&
            !cookies.token && ( // 클라이언트 렌더링 시점에 쿠키를 확인
              <LoginButton onClick={openModal}>로그인</LoginButton>
            )}
        </div>
        <Image
          ref={pinRef}
          className={pin === 'pin_hide' ? 'pin_hide' : 'pin_show'}
          src={pin_location}
          alt="pin"
          width={40}
        />
      </main>
      <Modal openModal={openModal} modal={modal} width="35vw" height="75vh">
        {pageState ? (
          <Signup
            inputData={inputData}
            pwdShow={pwdShow}
            handlePwd={handlePwd}
            handleInputData={handleInputData}
            handleComponent={handleComponent}
            setPageState={setPageState}
          />
        ) : (
          <Login
            inputData={inputData}
            pwdShow={pwdShow}
            handlePwd={handlePwd}
            handleInputData={handleInputData}
            handleComponent={handleComponent}
            openModal={openModal}
          />
        )}
      </Modal>
    </HomeContainer>
  );
};

export default Main;
