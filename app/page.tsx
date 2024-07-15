"use client";
import styles from "./home.module.scss";
import { createContext, useEffect, useState } from "react";
import Image from "next/image";

// components
import NavBar from "@/app/_components/main/NavBar/page";
import { Map, Log, Likes, Chat } from "@/app/_components/main";
import RandomPin from "@/app/_components/main/RandomPin/page";
// constants
import MainModal from "@/app/_components/main/Modal";
import { HomeContainer, LoginButton } from "./_styles/main/mainStyles";

// img
import Profile from "@/app/_assets/main/userProfile.svg";
import ColorMap from "@/app/_assets/main/colored_Map.svg";
import Logo from "@/app/_assets/main/logo.svg";
import ClickedProfile from "@/app/_assets/main/modalClicked_Profile.svg";

// constants
import { homeDropdown } from "@/app/constatns/icons";
import { inputDataType } from "./types/aboutMain";

export const contextData = createContext({
  pwdShow: false,
  handlePwd: () => {},
  inputData: {
    email: "",
    password: "",
    checkPassword: "",
    authentication: "",
  },
  handleInputData: (sort: string, value: string) => {},
});

const Home = ({ children }: { children: React.ReactNode }) => {
  // dropdown 클릭 컨트롤
  const [dropdown, setDropdonw] = useState<boolean>(false);
  // 모달 컨트롤
  const [modal, setModal] = useState<boolean>(false);
  // 비밀번호 show
  const [pwdShow, setPwdShow] = useState<boolean>(false);
  // input data
  const [inputData, setInputData] = useState<inputDataType>({
    email: "",
    password: "",
    checkPassword: "",
    authentication: "",
  });
  const [fold, setFold] = useState(false);
  const [page, setPage] = useState("");
  const [element, setElement] = useState(Map);

  useEffect(() => {
    switch (page) {
      case "":
        setElement(Map);
        break;
      case "log":
        setElement(Log);
        break;
      case "likes":
        setElement(Likes);
        break;
      case "chat":
        setElement(Chat);
        break;
      default:
        setElement(Map);
    }
  }, [page]);

  const showDropdown = () => setDropdonw(!dropdown);
  const openModal = () => setModal(!modal);
  const handlePwd = () => setPwdShow(!pwdShow);

  const handleInputData = (sort: string, value: string) => {
    setInputData((prev) => ({
      ...prev,
      [sort]: value,
    }));
  };

  useEffect(() => {
    console.log("inputData: ", inputData);
  }, [inputData]);

  return (
    <main className={styles.main}>
      <section className={fold ? styles.navBar : styles.pinSection}>
        {fold ? (
          <NavBar
            onClick={setPage}
            className={styles.navbar}
            setInitial={setFold}
          />
        ) : (
          <div className={styles.sliderSection}>
            <div className={styles.slider}>
              <RandomPin setFold={setFold} />
            </div>
            <div className={styles.description}>
              <p className={styles.eng}>Tap for a Random Adventure</p>
              <p className={styles.kor}>
                원하는 테마를 골라 즐거운 여행을 경험해보세요!
              </p>
            </div>
          </div>
        )}
      </section>
      <section className={fold ? styles.page : styles.home}>
        {fold ? (
          <>{element}</>
        ) : (
          <HomeContainer dropdown={dropdown} modal={modal}>
            <header>
              <div>
                <Image
                  src={modal === true ? ClickedProfile : Profile}
                  alt="유저 프로필"
                  width={35}
                  height={35}
                  onClick={showDropdown}
                />
                <div className="iconCol">
                  {homeDropdown.map((item, i) => (
                    <div key={i}>
                      <Image
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
            <contextData.Provider
              value={{ pwdShow, handlePwd, inputData, handleInputData }}
            >
              <MainModal
                openModal={openModal}
                pwdShow={pwdShow}
                handlePwd={handlePwd}
              />
            </contextData.Provider>
          </HomeContainer>
        )}
      </section>
    </main>
  );
};

export default Home;
