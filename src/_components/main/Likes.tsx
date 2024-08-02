import { getLikeList } from "@/pages/api/map";
import { Recommend } from "@/src/types/aboutMap";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import Card from "@/src/_components/Common/Card";
import Landing from "@/src/_components/Common/Landing";

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 72px);
  height: 100vh;
  animation: fadein 2.5s ease-in-out;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const Container = styled.div`
  width: calc(100vw - 72px);
  height: 100vh;
  animation: fadein 1s ease-in-out;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 40px;
  gap: 40px;
  > .header {
    width: 100%;
    height: 60px;
    font-size: 40px;
    /* margin-bottom: 20px; */
  }
  .likes {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }
`;
const Likes = () => {
  const fetchLikes = async () => {
    const response = await getLikeList();
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("데이터 로드 실패");
  };
  const {
    data: likes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["getLikes"],
    queryFn: fetchLikes,
    refetchInterval: 1000 * 5,
  });
  if (isLoading)
    return (
      <Loading>
        <Landing />
      </Loading>
    );
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <Container>
      <div className="header">Liked List</div>
      <div className="likes">
        {likes?.map((recommend: Recommend, index: number) => (
          <Card
            key={recommend.locationId + index}
            recommend={recommend}
            refetch={refetch}
          />
        ))}
      </div>
    </Container>
  );
};

export default Likes;
