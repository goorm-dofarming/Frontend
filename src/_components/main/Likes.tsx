import { getLikeList } from "@/pages/api/map";
import { Recommend } from "@/src/types/aboutMap";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import Card from "@/src/_components/Common/Card";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 20px;
  gap: 20px;
  .title {
    width: 100%;
    height: 60px;
    font-size: 40px;
    /* margin-bottom: 20px; */
  }
  .likes {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
`;
const Likes = () => {
  const [likes, setLikes] = useState<Recommend[]>([]);
  const getLikes = useQuery({
    queryKey: ["getLikes"],
    queryFn: async () => {
      const response = await getLikeList();
      if (response.status === 200) {
        setLikes([...response.data]);
        console.log(response.data);

        return response.data;
      }
    },
    refetchInterval: 1000 * 60,
  });
  return getLikes.isLoading ? (
    <div>loading</div>
  ) : (
    <Container>
      <div className="title">Liked List</div>
      <div className="likes">
        {/* {likes.map((recommend, index) => (
          <Card key={recommend.id + index} recommend={recommend} />
        ))} */}
      </div>
    </Container>
  );
};

export default Likes;
