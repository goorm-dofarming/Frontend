import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './share.module.scss';
import Image from 'next/image';
import cloud from '@/src/_assets/main/map/cloud.png';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import { useQuery } from '@tanstack/react-query';
import { getLogDataGuest } from '@/pages/api/map';
import CardListItem from '@/src/_components/Common/CardListItem';
import { Recommend } from '@/src/types/aboutMap';
import { decimalToDMS } from '@/src/_components/main/RandomPin/util';
import Landing from '@/src/_components/Common/Landing';
const LinkShare = () => {
  const router = useRouter();
  const [logId, setLogId] = useState<number>(0);
  const fetchLog = async () => {
    const response = await getLogDataGuest(logId);
    const data = response.data;
    // console.log(data);
    const logData = data.logResponse;
    if (response.status === 200) {
      const { latDMS, lngDMS } = decimalToDMS(
        logData.latitude,
        logData.longitude
      );
      return {
        logResponse: logData,
        recommendations: data.recommendations,
        lngDMS: lngDMS,
        latDMS: latDMS,
      };
    }
    throw new Error('데이터 로드 실패');
  };

  const {
    data: log,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['getLog'],
    queryFn: fetchLog,
    refetchInterval: 1000 * 60, // 1분마다 데이터 갱신
  });

  useEffect(() => {
    if (router) {
      setLogId(Number(router?.query?.id));
    }
  }, [router]);
  if (isLoading)
    return (
      <div className={styles.landing}>
        <Landing />
      </div>
    );
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <main className={styles.main}>
      <p
        className={styles.title}
      >{`우리의\n${log?.logResponse?.theme} 여행지는?`}</p>
      <section className={styles.cloud}>
        <Image src={cloud} width={308} height={221} alt="cloud" />
        <div className={styles.addrContainer}>
          <div className={styles.left}>
            <ImQuotesLeft />
          </div>
          <div className={styles.addr}>
            <p className={styles.address}> {log?.logResponse?.address}</p>
            <p className={styles.latlng}>{`${log?.latDMS} ${log?.lngDMS} `}</p>
          </div>
          <div className={styles.right}>
            <ImQuotesRight />
          </div>
        </div>
      </section>
      <section className={styles.list}>
        {log?.recommendations?.map((recommend: Recommend, index: number) => (
          <CardListItem
            key={recommend.locationId + index}
            recommend={recommend}
          />
        ))}
      </section>
    </main>
  );
};

export default LinkShare;
