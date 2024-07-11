import Image from "next/image";
import styles from "./home.module.scss";


const Home = ({ children }: { children: React.ReactNode }) => {
  return <main className={styles.main}>home</main>;
};

export default Home;
