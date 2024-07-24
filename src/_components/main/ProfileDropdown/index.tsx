import { homeDropdown } from "@/src/constatns/icons";
import Image from "next/image";
import Profile from "@/src/_assets/main/userProfile.svg";
import { useState } from "react";
import useToggle from "@/src/hooks/Home/useToggle";
import { colorTheme } from "@/src/_styles/common/commonColorStyles";
import styled, { css } from "styled-components";
import { hideHomeIcons, showHomeIcons } from "@/src/_styles/keyframes";
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
      dropdown === "true"
        ? css`0.5s ${showHomeIcons} ease-in-out`
        : css`0.5s ${hideHomeIcons} ease-in-out`};
    transition: 0.3s visibility;
    visibility: ${({ dropdown }) =>
      dropdown === "true" ? "visible" : "hidden"};
  }
  .iconBg {
    width: 3vw;
    height: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: #efefef;
      border-radius: 20%;
    }
  }
  .icons {
    cursor: pointer;
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
