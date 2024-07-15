'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
// styles
import { HomeContainer } from '@/app/_styles/main/mainStyles';
import { contextData } from '@/app/page';

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

interface MainType {
  dropdown: boolean;
  showDropdown: () => void;
  pageState: boolean;
}

const Main = ({ dropdown, showDropdown, pageState }: MainType) => {
  const { modal, openModal } = useContext(contextData);
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
      <Modal width="35vw" height="75vh">
        {pageState ? <Signup /> : <Login />}
      </Modal>
    </HomeContainer>
  );
};

export default Main;
