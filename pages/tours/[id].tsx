import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./share.module.scss";
import Image from "next/image";
import cloud from "@/src/_assets/main/map/cloud.png";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
const LinkShare = () => {
  const router = useRouter();
  const [logId, setLogId] = useState(router.query.id);
  //   const id = router.query.id;
  useEffect(() => {
    console.log(router.query);
    console.log(typeof logId, logId);
  }, [logId]);
  return (
    <main className={styles.main}>
      <p className={styles.title}>
        우리의 <br />
        랜덤(카페 etc) 여행지는?{" "}
      </p>
      <section className={styles.cloud}>
        <Image src={cloud} width={308} height={221} alt="cloud" />
        <div className={styles.addrContainer}>
          <div className={styles.left}>
            <ImQuotesLeft />
          </div>
          <div className={styles.addr}>
            <p className={styles.address}>대구광역시 군위군</p>
            <p className={styles.latlng}> 37˚00'00"N 127˚00'00"E</p>
          </div>
          <div className={styles.right}>
            <ImQuotesRight />
          </div>
        </div>
      </section>
      <section></section>
    </main>
  );
};

export default LinkShare;
