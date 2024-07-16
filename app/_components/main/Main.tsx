'use client';
import React, { useState } from 'react';
import Image from 'next/image';
// styles
import { HomeContainer } from '@/app/_styles/main/mainStyles';

// constants
import { homeDropdown } from '@/app/constatns/icons';
import { LoginButton } from '@/app/_styles/main/buttons';

// components
import Modal from '@/app/_components/common/Modal';
import Login from '@/app/_components/main/modal/Login';
import Signup from '@/app/_components/main/modal/Signup';

// img
import Profile from '@/app/_assets/main/userProfile.svg';
import ColorMap from '@/app/_assets/main/colored_Map.svg';
import Logo from '@/app/_assets/main/logo.svg';
import ClickedProfile from '@/app/_assets/main/modalClicked_Profile.svg';

// types
import { inputDataType } from '@/app/types/aboutMain';

// hooks
import useToggle from '@/app/hooks/Home/useToggle';

const Main = () => {
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

  return (
    <HomeContainer $dropdown={dropdown} $modal={modal}>
      <header>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image
            src={modal === true ? ClickedProfile : Profile}
            alt="유저 프로필"
            width={35}
            height={35}
            onClick={showDropdown}
            className="icons"
          />
          <div className="iconCol">
            {homeDropdown.map((item, i) => (
              <div key={i} className="iconBg">
                <Image
                  className="icons"
                  src={item.img}
                  alt={item.id}
                  width={25}
                  height={25}
                />
              </div>
            ))}
          </div>
        </div>
      </header>
      <main>
        <Image className="colorMap" src={ColorMap} alt="맵" width={360} />
        <div className="logoContainer">
          <Image className="logo" src={Logo} alt="맵" width={250} />
          <LoginButton onClick={openModal} modal={modal}>
            로그인
          </LoginButton>
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
          />
        )}
      </Modal>
    </HomeContainer>
  );
};

export default Main;
