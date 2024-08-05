import Image from "next/image";
import { useCookies } from "react-cookie";
import { MouseEvent, useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import cx from "classnames";

// icons
import { IoHeartSharp, IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { FaMapMarkedAlt, FaRegClock } from "react-icons/fa";
import logo from "@/src/_assets/icons/logo.png";
import { IoMdLogIn } from "react-icons/io";

// atoms
import { useRecoilState, useRecoilValue } from "recoil";
import { pageState, userState,randomPinState } from "@/src/atom/stats";
import { alarmState } from "@/src/atom/stats";

// hooks
import useToggle from "@/src/hooks/Home/useToggle";

// components
import Toast from "@/src/_components/Common/Toast";

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
  const [user, setUser] = useRecoilState(userState);
  const [active, setPage] = useRecoilState(pageState);
  const [cookies, removeCookie] = useCookies(["token"]);
  const [alarm, setAlarm] = useRecoilState(alarmState);
  const [toast, setToast] = useState<boolean>(false);
  const openToast = useToggle(toast, setToast);
  const [randomPin, setRandomPin] = useRecoilState(randomPinState);
  
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    if((id==="map" || id==="log") && randomPin.logId===0){
      console.log(randomPin)
      openToast();
      return;
    }
    setPage(id);
  };
  const handleLogout = () => {
    removeCookie("token", "", { path: "/" });
    setUser({ userId: 0, email: "", nickname: "", imageUrl: "", role: "" });
    setInitial(false);
    setPage("home");
  };

  useEffect(() => {
    if (active === "chat") {
      setAlarm(false);
    }
  }, [active]);
  return (
    <nav className={cx(styles.nav, className)} draggable="false">
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
            className={cx(
              styles.button,
              { [styles.focus]: page === active },
              { [styles.isMember]: user.userId > 0 }
            )}
            onClick={user.userId > 0 || page === "map" ? onClick : openToast}
            id={page}
          >
            {page === "chat" && (
              <span className={cx(alarm && styles.alarm)}></span>
            )}
            {icon}
          </button>
        ))}
      </div>
      <button className={styles.button}>
        {user.userId > 0 ? (
          <IoMdLogOut fill="white" onClick={handleLogout} />
        ) : (
          <IoMdLogIn fill="white" />
        )}
      </button>
      {user.userId === 0 && (
        <Toast
          content={"로그인하여 더 많은 기능을 이용해 보세요 !"}
          toast={toast}
          openToast={openToast}
        />
      )}
       {user.userId && (
        <Toast
          content={"랜덤핀을 던져보세요!"}
          toast={toast}
          openToast={openToast}
          toastType="warning"
        />
      )}
    </nav>
  );
};

export default NavBar;
