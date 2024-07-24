import { homeDropdown } from '@/src/constatns/icons';
import Image from 'next/image';
import Profile from '@/src/_assets/main/userProfile.svg';
import { useState } from 'react';
import useToggle from '@/src/hooks/Home/useToggle';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';
import styled, { css } from 'styled-components';
import { hideHomeIcons, showHomeIcons } from '@/src/_styles/keyframes';
import { useRecoilState } from 'recoil';
import { alarmState } from '@/src/atom/stats';
const IconContainer = styled.div<{
  dropdown: string;
}>`
  z-index: 500;
  position: absolute;
  top: 2%;
  right: 0;
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
  .icons {
    cursor: pointer;
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
}: {
  setFold: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const showDropdown = useToggle(dropdown, setDropdown);
  const [alarm, setAlarm] = useRecoilState(alarmState);
  const onClick = (id: string) => {
    setPage(id);
    setTimeout(() => {
      setFold(true);
    }, 500);
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
    </IconContainer>
  );
};

export default ProfileDropdown;
