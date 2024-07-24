import styles from "@/src/home.module.scss";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// components
import NavBar from "@/src/_components/main/NavBar";
import { Map, Log, Likes, Chat } from "@/src/_components/main";
import Main from "@/src/_components/main/Main";
import RandomPin from "@/src/_components/main/RandomPin";
import ProfileDropdown from "@/src/_components/main/ProfileDropdown";
import { pageState } from "@/src/atom/stats";
import { useRecoilState } from "recoil";

import { useCookies } from "react-cookie";

const menu: { [key: string]: JSX.Element | null } = {
  home: <div></div>,
  map: <Map />,
  log: <Log />,
  likes: <Likes />,
  chat: <Chat />,
};

const Home = () => {
  const [cookies, setCookies] = useCookies(["token"]);
  const [fold, setFold] = useState<boolean>(false);
  const [page, setPage] = useRecoilState(pageState);
  const [element, setElement] = useState<React.JSX.Element | null>(menu[page]);
  const [pin, setPin] = useState<string>("pin_hide");

  useEffect(() => {
    setElement(menu[page]);
  }, [page]);

  return (
    <main className={styles.main}>
      <div id="modal-container"></div>
      {cookies.token && <ProfileDropdown setFold={setFold} setPage={setPage} />}
      <section className={fold ? styles.navBar : styles.pinSection}>
        {fold ? (
          <NavBar className={styles.navbar} setInitial={setFold} />
        ) : (
          <div className={styles.sliderSection}>
            <div className={styles.slider}>
              <RandomPin setFold={setFold} setPage={setPage} setPin={setPin} />
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
        {fold ? <>{element}</> : <Main pin={pin} />}
      </section>
    </main>
  );
};

export default Home;
