import Image from "next/image";
import styles from "./navbar.module.scss";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoHeartSharp } from "react-icons/io5";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import logo from "@/app/_assets/icons/logo.svg";
import Link from "next/link";
import cx from "classnames";

const NavBar = ({
  className,
  onClick,
  setInitial,
}: {
  className: string;
  onClick: React.Dispatch<React.SetStateAction<string>>;
  setInitial: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <nav className={cx(styles.nav, className)}>
      <div className={styles.menu}>
        <button className={styles.logo} onClick={() => setInitial(false)}>
          <Image src={logo} width={60} height={60} alt="logo" />
        </button>
        <button className={styles.button} onClick={() => onClick("log")}>
          <RiChatHistoryFill fill="white" />
        </button>
        <button className={styles.button} onClick={() => onClick("likes")}>
          <IoHeartSharp fill="white" />
        </button>
        <button className={styles.button} onClick={() => onClick("chat")}>
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
