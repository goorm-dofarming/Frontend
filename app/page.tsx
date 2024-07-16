'use client';
import styles from './home.module.scss';
import React, { useEffect, useState } from 'react';

// components
import NavBar from '@/app/_components/main/NavBar/page';
import { Map, Log, Likes, Chat } from '@/app/_components/main';
import Main from './_components/main/Main';

const Home = () => {
  const [fold, setFold] = useState<boolean>(false);
  const [page, setPage] = useState<string>('');
  const [element, setElement] = useState<React.JSX.Element>(Map);

  useEffect(() => {
    switch (page) {
      case "map":
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
              <RandomPin setFold={setFold} setPage={setPage} />
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
        {fold ? <>{element}</> : <Main />}
      </section>
    </main>
  );
};

export default Home;
