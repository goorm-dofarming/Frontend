import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';

// hooks
import useToggle from '@/src/hooks/Home/useToggle';

// icons
import { homeDropdown } from '@/src/constatns/icons';
import Profile from '@/src/_assets/main/userProfile.svg';

// style
import styled, { css } from 'styled-components';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';
import { hideHomeIcons, showHomeIcons } from '@/src/_styles/keyframes';

// atoms
import { useRecoilState, useRecoilValue } from 'recoil';
import { alarmState, userState, pageState,randomPinState } from '@/src/atom/stats';

// components
import Modal from '../../Common/Modal';
import EditUser from '../modal/EditUser';

// api
import { modifyUser } from '@/pages/api/user';

const IconContainer = styled.div<{
  dropdown: string;
}>`
  z-index: 10;
  position: absolute;
  top: 2%;
  right: 2%;

  .userProfile {
    width: 3rem;
    height: 3rem;
    position: relative;
  }

  .profile {
    border-radius: 50%;
    border: 2px solid ${colorTheme.secondary};
  }

  .icons {
    cursor: pointer;
    position: relative;
  }

  .iconCol {
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    animation: ${({ dropdown }) =>
      dropdown === 'true'
        ? css`0.5s ${showHomeIcons} ease-in-out`
        : css`0.5s ${hideHomeIcons} ease-in-out`};
    transition: 0.3s visibility;
    visibility: ${({ dropdown }) =>
      dropdown === 'true' ? 'visible' : 'hidden'};
  }
  .iconBg {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:hover {
      background-color: #efefef;
      border-radius: 20%;
    }
  }

  .alarm {
    width: 10px;
    height: 10px;
    background-color: ${colorTheme.primary};
    border-radius: 50%;
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
  }
`;
const ProfileDropdown = ({
  setFold,
  setPage,
  refetchUser,
  openToast
}: {
  setFold: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  refetchUser: () => void;
  openToast?:()=>void;
}) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const showDropdown = useToggle(dropdown, setDropdown);
  const [alarm, setAlarm] = useRecoilState(alarmState);
  const user = useRecoilValue(userState);
  const page = useRecoilValue(pageState);
  const [randomPin, setRandomPin] = useRecoilState(randomPinState);
  // 프로필 수정 모달
  const [modal, setModal] = useState<boolean>(false);
  const openModal = useToggle(modal, setModal);

  const onClick = (id: string) => {
    if (id === 'settings') {
      openModal();
    } else {
      if(randomPin.logId===0 && (id==="map" || id==="log")){
        if(openToast){
          openToast();
        }
        return;
      }
      setPage(id);
      setTimeout(() => {
        showDropdown();
        setFold(true);
      }, 500);
    }
  };

  const getImageUrl = (url: string) => {
    if (url && !url.startsWith('http') && !url.startsWith('https')) {
      return `${process.env.NEXT_PUBLIC_DEPLOY_PROFILE_IMAGE_ADDRESS}/${url}`;
    }
    return url;
  };

  useEffect(() => {
    if (page !== 'home') {
      setDropdown(false);
    }
  }, [page]);

  // 화원 정보 수정
  const handleUpdateUser = async (
    image: File | null,
    changeImg: boolean,
    nickname: string,
    password: string
  ) => {
    const formData = new FormData();
    if (image) {
      formData.append('multipartFile', image);
    } else if (changeImg) {
      const emptyFile = new File([''], '', { type: 'text/plain' });
      formData.append('multipartFile', emptyFile);
    }

    const userModifyRequest: { nickname: string; password?: string } = {
      nickname: nickname,
    };
    if (password !== '') {
      userModifyRequest.password = password;
    }
    formData.append('userModifyRequest', JSON.stringify(userModifyRequest));

    try {
      await modifyUser(formData);
      refetchUser();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <IconContainer
      dropdown={dropdown.toString()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div className="userProfile">
        <Image
          src={user.imageUrl ? getImageUrl(user.imageUrl) : Profile}
          alt="유저 프로필"
          onClick={page === 'home' ? showDropdown : openModal}
          className="icons profile"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="iconCol">
        {homeDropdown.map((item, i) => {
          const IconComponent = item.img;
          return (
            <div key={i} className="iconBg">
              {item.id === 'chat' && alarm && <span className="alarm" />}
              <IconComponent
                className="icons"
                size={25}
                color={colorTheme.primary}
                onClick={() => onClick(item.id)}
              />
            </div>
          );
        })}
      </div>
      <Modal openModal={openModal} modal={modal} width="35rem" height="40rem">
        <EditUser
          openModal={openModal}
          onEditUser={handleUpdateUser}
          getImageUrl={getImageUrl}
        />
      </Modal>
    </IconContainer>
  );
};

export default ProfileDropdown;
