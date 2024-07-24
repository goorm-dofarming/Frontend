import Image from "next/image";
import styles from "./navbar.module.scss";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoHeartSharp, IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { FaMapMarkedAlt, FaRegClock } from "react-icons/fa";
import logo from "@/src/_assets/icons/logo.png";
import cx from "classnames";
import { MouseEvent, useState } from "react";
import { pageState } from "@/src/atom/stats";
import { useRecoilState } from "recoil";

const menu = [
  { page: "map", icon: <FaMapMarkedAlt fill="white" /> },
  { page: "log", icon: <FaRegClock fill="white" /> },
  { page: "likes", icon: <IoHeartSharp fill="white" /> },
  { page: "chat", icon: <IoChatbubbleEllipsesSharp fill="white" /> },
];
const NavBar = ({
  className,
  setInitial,
}: {
  className: string;
  setInitial: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [active, setPage] = useRecoilState(pageState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    setPage(id);
  };
  return (
    <nav className={cx(styles.nav, className)}>
      <div className={styles.menu}>
        <button
          className={styles.logo}
          onClick={() => {
            setInitial(false);
            setPage("home");
          }}
        >
          <Image src={logo} width={68} height={60} alt="logo" />
        </button>

        {menu.map(({ page, icon }, index) => (
          <button
            key={index}
            className={cx(styles.button, { [styles.focus]: page === active })}
            onClick={onClick}
            id={page}
          >
            {icon}
          </button>
        ))}
      </div>
      <button className={styles.button}>
        <IoMdLogOut fill="white" />
      </button>
    </nav>
  );
};

export default NavBar;
