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
import { decimalToDMS } from "@/src/_components/main/RandomPin/util";
const LinkShare = () => {
  const router = useRouter();
  const [logId, setLogId] = useState<number>(0);
  const [logData, setLogData] = useState<Recommend[]>([]);
  const [logInfo, setLogInfo] = useState({
    address: "",
    latitue: 0,
    longitude: 0,
    lngDMS: "",
    latDMS: "",
    theme: "",
  });
  //   const id = router.query.id;
  const getLog = useQuery({
    queryKey: ["getLog"],
    queryFn: async () => {
      const response = await getLogData(logId);
      console.log(response);
      const data = response.data;
      const logData = data.logResponse;
      if (response.status === 200) {
        setLogData([...data.recommendations]);
        const { latDMS, lngDMS } = decimalToDMS(
          logData.latitude,
          logData.longitude
        );
        setLogInfo({
          address: logData.address,
          latitue: logData.latitude,
          longitude: logData.longitude,
          theme: logData.theme,
          lngDMS: lngDMS,
          latDMS: latDMS,
        });
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
      <p className={styles.title}>{`우리의\n${logInfo?.theme} 여행지는?`}</p>
      <section className={styles.cloud}>
        <Image src={cloud} width={308} height={221} alt="cloud" />
        <div className={styles.addrContainer}>
          <div className={styles.left}>
            <ImQuotesLeft />
          </div>
          <div className={styles.addr}>
            <p className={styles.address}> {logInfo?.address}</p>
            <p className={styles.latlng}>
              {`${logInfo?.latDMS} ${logInfo?.lngDMS} `}
            </p>
          </div>
          <div className={styles.right}>
            <ImQuotesRight />
          </div>
        </div>
      </section>
      <section className={styles.list}>
        {logData?.map((recommend, index) => (
          <CardListItem
            key={recommend.locationId + index}
            recommend={recommend}
            // width={window.innerWidth}
          />
        ))}
      </section>
    </main>
  );
};

export default LinkShare;
