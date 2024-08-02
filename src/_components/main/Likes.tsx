import { getLikeList } from "@/pages/api/map";
import { Recommend } from "@/src/types/aboutMap";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@/src/_components/Common/Card";
import Landing from "@/src/_components/Common/Landing";
import Chip from "@/src/_components/Common/Chip";
import {regions,RegionType, sortMenu, SortType} from "@/src/types/aboutLikes";
import {themes,Theme} from "@/src/types/aboutMap";
import Dropdown from "@/src/_components/Common/Dropdown";
import { BsSearchHeart } from "react-icons/bs";
import { LuDelete } from "react-icons/lu";
import { colorTheme } from "@/src/_styles/common/commonColorStyles";
const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 72px);
  height: 100vh;
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
  padding: 16px 40px;
  gap: 40px;
  > .header {
    display:flex;
    flex-direction:column;
    gap:20px;
    width: 100%;
    height: 140px;
    > .title {
      width: 100%;
      font-size: 32px;
    }
    > .likeFunction {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      .chips {
        width: 100%;
        height: 100%;
        display:flex;
    flex-direction:column;
    gap:12px;

        .row{
          width:100%;
          display:flex;
          flex-direction:row;
          justify-content:space-between;
          .chip {
          display:flex;
          flex-direction:row;
          justify-content:flex-start;
          gap:8px;
          width: 100%;
          height: 40px;
        }
        .likeInput{
          z-index:10;
          padding:4px 8px;
          border:1px solid ${colorTheme.secondary};
          display:flex;
          flex-direction:row;
          justify-content:space-between;
          align-items:center;
          gap:8px;
          >.icon{
            cursor:pointer;
            background: none;
            border: none;
            color:${colorTheme.secondary};
          }
          >input{
            outline:none;
            border:none;
          }
        }
        }
      }
      .sort {
        width: 10%;
        height: 100%;
      }
    }
    /* margin-bottom: 20px; */
  }
  .likes {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    overflow-y: scroll;
  }
`;

const Likes = () => {
  const [selectedRegions, setSelectedRegions] = useState<any[]>([]);
  const [selectedThemes, setSeletedThemes] = useState<any[]>([]);
  const [sortType,setSortType] = useState<SortType>(sortMenu[0]);
  const [searchText, setSearchText] = useState<string>("");
  const onChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
    const data = e.target.value;
    setSearchText(data);
  }
  const fetchLikes = async () => {
    const params = {
      themes:selectedThemes,
      regions: selectedRegions,
      sortType: sortType.value,
    }
    const response = await getLikeList(params);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("데이터 로드 실패");
  };
  useEffect(()=>{
    refetch();
  },[sortType, selectedThemes,selectedRegions])
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
    <div className="header">
      <p className="title">좋아요</p>
      <div className="likeFunction">
        <div className="chips">
       
          <div className="row">
            <div className="chip">
                    {regions.map((region:RegionType)=>( <Chip
                    key={region.id}
                          content={region.content}
                          isSelected={selectedRegions.includes(region.value)}
                          id={region.id}
                          value={region.value}
                          onClick={setSelectedRegions}
                        />
                        ))}
              </div>
              <Dropdown value={sortType.name} items={sortMenu} onClick={setSortType}/>
          </div>
         <div className="row">
          <div className="chip">
            {themes.slice(1).map((theme:Theme)=>( <Chip
              key={theme.id}
                content={theme.id}
                isSelected={selectedThemes.includes(theme.themeId)}
                id={theme.themeId}
                value={theme.themeId}
                onClick={setSeletedThemes}
              />))}
            </div>
            
            <div className="likeInput">
              <span className="icon"><BsSearchHeart size="20" /></span>
              
              <input type="text" placeholder="검색어를 입력하세요." onChange={onChange} value={searchText}/>
              <button className="icon" onClick={()=>setSearchText("")}><LuDelete size="24"/></button>
            </div>
         </div>
        </div>
   
      </div>
    </div>
    <div className="likes">
      {searchText ? 
       likes?.filter((recommend: Recommend)=>recommend.title.indexOf(searchText)!==-1 || recommend.addr.indexOf(searchText)!==-1 ).map((recommend: Recommend, index: number) => (
           <Card
  key={recommend.locationId + index}
  recommend={recommend}
  refetch={refetch}
/>))
      : likes?.map((recommend: Recommend, index: number) => (
        <Card
          key={recommend.locationId + index}
          recommend={recommend}
          refetch={refetch}
        />
      ))}
    </div>
  </Container>
  )
   
};

export default Likes;
