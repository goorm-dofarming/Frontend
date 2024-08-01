import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./share.module.scss";
import Image from "next/image";
import cloud from "@/src/_assets/main/map/cloud.png";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import { getLogData } from "@/pages/api/log";
import CardListItem from "@/src/_components/Common/CardListItem";
import { Recommend } from "@/src/types/aboutMap";
const LinkShare = () => {
  const router = useRouter();
  const [logId, setLogId] = useState<number>(0);
  const [logData, setLogData] = useState<Recommend[]>([]);
  //   const id = router.query.id;
  const getLog = useQuery({
    queryKey: ["getLog"],
    queryFn: async () => {
      const response = await getLogData(logId);
      console.log("get log", response.data);
      if (response.status === 200) {
        setLogData([...response.data]);
        return response.data;
      }
    },
    refetchInterval: 1000 * 60,
  });
  useEffect(() => {
    if (router) {
      setLogId(Number(router?.query?.id));
    }
  }, [router]);

  return getLog.isLoading ? (
    <div>loading</div>
  ) : (
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
      <section className={styles.list}>
        {logData?.map((recommend, index) => (
          <CardListItem
            key={recommend.id + index}
            recommend={recommend}
            // width={window.innerWidth}
          />
        ))}
      </section>
    </main>
  );
};

export default LinkShare;
