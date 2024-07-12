"use client";
import Image from "next/image";
import styles from "./home.module.scss";
import { useEffect, useState } from "react";
import NavBar from "@/app/_components/main/NavBar/page";
import { Map, Log, Likes, Chat } from "@/app/_components/main";

const Home = ({ children }: { children: React.ReactNode }) => {
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
          <>
            <div>
              <button onClick={() => setFold(true)}>임시버튼</button>
            </div>
            <div className={styles.description}>
              <p>Tap for a Random Adventure</p>
              <p>원하는 테마를 골라 즐거운 여행을 경험해보세요!</p>
            </div>
          </>
        )}
      </section>
      <section className={fold ? styles.page : styles.home}>
        {fold ? <>{element}</> : <>home</>}
      </section>
    </main>
  );
};

export default Home;
