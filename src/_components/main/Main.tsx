import React, { useEffect, useState } from 'react';
import Image from 'next/image';
// styles
import { HomeContainer } from '@/src/_styles/main/mainStyles';

// constants
import { homeDropdown } from '@/src/constatns/icons';
import { LoginButton } from '@/src/_styles/common/buttons';

// components
import Modal from '@/src/_components/Common/Modal';
import Login from '@/src/_components/main/modal/Login';
import Signup from '@/src/_components/main/modal/Signup';

// img
import Profile from '@/src/_assets/main/userProfile.svg';
import ColorMap from '@/src/_assets/main/colored_Map.svg';
import Logo from '@/src/_assets/main/logo.svg';

// types
import { inputDataType } from '@/src/types/aboutMain';

// hooks
import useToggle from '@/src/hooks/Home/useToggle';
import { useCookies } from 'react-cookie';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';

const Main = () => {
  // cookie
  const [cookies, setCookies] = useCookies(['token']);
  // 모달 컨트롤
  const [modal, setModal] = useState<boolean>(false);
  // 로그인 회원가입 페이지 컨트롤
  const [pageState, setPageState] = useState(false);
  // dropdown 클릭 컨트롤
  const [dropdown, setDropdown] = useState<boolean>(false);
  // 비밀번호 show
  const [pwdShow, setPwdShow] = useState<boolean>(false);
  // input data
  const [inputData, setInputData] = useState<inputDataType>({
    email: '',
    password: '',
    confirmPassword: '',
    authentication: '',
  });

  const showDropdown = useToggle(dropdown, setDropdown);
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
    console.log('inputData: ', inputData);
  }, [inputData]);

  return (
    <HomeContainer dropdown={dropdown.toString()} modal={modal.toString()}>
      <header>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image
            src={Profile}
            alt="유저 프로필"
            width={35}
            height={35}
            onClick={showDropdown}
            className="icons"
          />
          <div className="iconCol">
            {homeDropdown.map((item, i) => {
              const IconComponent = item.img; // 각 아이콘 컴포넌트를 변수에 저장
              return (
                <div key={i} className="iconBg">
                  <IconComponent
                    className="icons"
                    size={25}
                    color={colorTheme.primary}
                  />
                  {/* 아이콘 컴포넌트를 직접 렌더링 */}
                </div>
              );
            })}
          </div>
        </div>
      </header>
      <main>
        <Image className="colorMap" src={ColorMap} alt="맵" width={360} />
        <div className="logoContainer">
          <Image className="logo" src={Logo} alt="로고" width={280} />
          {cookies.token ? null : (
            <LoginButton onClick={openModal}>로그인</LoginButton>
          )}
        </div>
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
