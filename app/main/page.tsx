"use client";
import { ReactNode, useEffect, useState } from "react";
import styles from "./main.module.scss";
import NavBar from "@/app/main/NavBar/page";
import { Map, Log, Likes, Chat } from "@/app/_components/main";

const MainPage = () => {
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
      <NavBar onClick={setPage} className={styles.navbar} />
      <section className={styles.page}>{element}</section>
    </main>
  );
};

export default MainPage;
