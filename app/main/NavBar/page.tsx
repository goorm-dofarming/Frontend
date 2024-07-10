import Image from "next/image";
import styles from "./navbar.module.scss";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoHeartSharp } from "react-icons/io5";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import logo from "@/app/_assets/icons/logo.png";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.menu}>
        <Link href="/">
          <Image src={logo} width={52} height={52} alt="logo" />
        </Link>
        <button className={styles.button}>
          <RiChatHistoryFill fill="white" />
        </button>
        <button className={styles.button}>
          <IoHeartSharp fill="white" />
        </button>
        <button className={styles.button}>
          <IoChatbubbleEllipsesSharp fill="white" />
        </button>
      </div>
      <button className={styles.button}>
        <IoMdLogOut fill="white" />
      </button>
    </nav>
  );
};

export default NavBar;
