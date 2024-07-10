import { ReactNode } from "react";
import styles from "./main.module.scss";
import NavBar from "@/app/main/NavBar/page";
const page = ({ children }: { children: ReactNode }) => {
  return (
    <main className={styles.main}>
      <NavBar />
      <section>{children}</section>
      {/* {children} */}
    </main>
  );
};

export default page;
