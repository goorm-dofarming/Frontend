import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
// styles
import { HomeContainer } from "@/src/_styles/main/mainStyles";

// constants
import { homeDropdown } from "@/src/constatns/icons";
import { LoginButton } from "@/src/_styles/main/buttons";

// components
import Modal from "@/src/_components/Common/Modal";
import Login from "@/src/_components/main/modal/Login";
import Signup from "@/src/_components/main/modal/Signup";

// img
import Profile from '@/src/_assets/main/userProfile.svg';
import ColorMap from '@/src/_assets/main/colored_Map.svg';
import Logo from '@/src/_assets/main/logo.svg';
import pin_location from "@/src/_assets/main/map/pin_location.png";

// types
import { inputDataType } from "@/src/types/aboutMain";

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
  // dropdown 클릭 컨트롤
  const [dropdown, setDropdown] = useState<boolean>(false);
  // 비밀번호 show
  const [pwdShow, setPwdShow] = useState<boolean>(false);
  // input data
  const [inputData, setInputData] = useState<inputDataType>({
    email: "",
    password: "",
    confirmPassword: "",
    authentication: "",
  });
  const [showFog, setShowFog] = useState<boolean>(false);

  const pinRef = useRef<HTMLImageElement>(null); // 핀 요소에 대한 ref

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
    console.log(showFog);
  }, [showFog]);
  useEffect(() => {
    console.log("inputData: ", inputData);
  }, [inputData]);

  useEffect(() => {
    const pinElement = pinRef.current;
    if (pinElement) {
      const handleAnimationEnd = () => {
        setShowFog(true);
      };
      pinElement.addEventListener("animationend", handleAnimationEnd);
      return () => {
        pinElement.removeEventListener("animationend", handleAnimationEnd);
        // setShowFog(false);
      };
    }
  }, []);
  return (
    <HomeContainer $dropdown={dropdown} modal={modal.toString()}>
      <div className={`fog ${showFog ? "fog_show" : ""}`}></div>
      <header>
        <div
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
      <main className="mainSection">
        <Image className="colorMap" src={ColorMap} alt="맵" width={360} />
        <div className="logoContainer">
          <Image className="logo" src={Logo} alt="로고" width={280} />
          {cookies.token ? null : (
            <LoginButton onClick={openModal} modal={modal}>
              로그인
            </LoginButton>
          )}
        </div>
        <Image
          ref={pinRef}
          className={pin === "pin_hide" ? "pin_hide" : "pin_show"}
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
          />
        )}
      </Modal>
    </HomeContainer>
  );
};

export default Main;
