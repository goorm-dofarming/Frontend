import { getLikeList } from '@/pages/api/map';
import { Recommend } from '@/src/types/aboutMap';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import Card from '@/src/_components/Common/Card';
import Landing from '@/src/_components/Common/Landing';
import Chip from '@/src/_components/Common/Chip';
import {
  regions,
  RegionType,
  sortMenu,
  SortType,
} from '@/src/types/aboutLikes';
import { themes, Theme } from '@/src/types/aboutMap';
import Dropdown from '@/src/_components/Common/Dropdown';
import { BsSearchHeart } from 'react-icons/bs';
import { LuDelete } from 'react-icons/lu';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';
import ChatLoader from '../Common/ChatLoader';
import debounce from 'lodash/debounce';
import Modal from '../Common/Modal';
import PlaceInfo from './modal/review/PlaceInfo';
import useToggle from '@/src/hooks/Home/useToggle';
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

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 40px;
  gap: 40px;
  > .header {
    display: flex;
    flex-direction: column;
    gap: 20px;
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
        display: flex;
        flex-direction: column;
        gap: 12px;

        .row {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .chip {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            gap: 8px;
            width: 100%;
            height: 40px;
          }
          .likeInput {
            z-index: 10;
            padding: 4px 8px;
            border: 1px solid ${colorTheme.secondary};
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 8px;

            > .icon {
              cursor: pointer;
              background: none;
              border: none;
              color: ${colorTheme.secondary};
            }
            > input {
              outline: none;
              border: none;
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
    /* height:100%; */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 32px;
    overflow-y: auto;
    height: calc(100vh - 240px);
    /* height:auto; */
    max-height: 80vh;
  }
  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 100px;
    animation: fadein 1s ease-in-out;
  }
  .overContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 25rem;
    bottom: 32px;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 10;
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

interface loadInfoType {
  likeId: number;
  updatedAt: string;
}

const Likes = () => {
  const [selectedRegions, setSelectedRegions] = useState<any[]>([]);
  const [selectedThemes, setSeletedThemes] = useState<any[]>([]);
  const [sortType, setSortType] = useState<SortType>(sortMenu[0]);
  const [searchText, setSearchText] = useState<string>('');
  const [loadInfo, setLoadInfo] = useState<loadInfoType>({
    likeId: 0,
    updatedAt: '',
  });
  const [search, setSearch] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);

  const [modal, setModal] = useState<boolean>(false);
  const openModal = useToggle(modal, setModal);
  const [selectedLocationId, setSelectedLocationId] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const observerTargetRef = useRef<HTMLDivElement | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch((prev) => !prev);
  };
  const refetch = () => {
    setData([]);
    setLoadInfo({
      likeId: 0,
      updatedAt: '',
    });
    setHasNextPage(true);
  };
  const onClickCard = (locationId: number) => {
    setSelectedLocationId(locationId);
    openModal();
  };
  useEffect(() => {
    console.log(loadInfo, hasNextPage);
    if (data.length === 0 && loadInfo.likeId === 0 && hasNextPage) {
      console.log('refetch');
      fetchLikes();
    }
  }, [data, loadInfo, hasNextPage]);
  const onScroll = useCallback(
    debounce((event) => {
      const { scrollTop, scrollHeight, clientHeight } = event.target;

      if (scrollHeight - scrollTop <= clientHeight + 100 && hasNextPage) {
        fetchLikes();
      }
    }, 3000),
    [hasNextPage, loadInfo]
  );
  const fetchLikes = async () => {
    if (loading) {
      console.log('로딩중');
      return;
    }
    try {
      setLoading(true);
      const params: Record<string, any> = {
        sortType: sortType.value,
      };
      if (loadInfo.likeId !== 0) {
        console.log(loadInfo);
        params['likeId'] = loadInfo.likeId;
        params['updatedAt'] = loadInfo.updatedAt;
      }
      if (selectedThemes.length > 0) {
        params['themes'] = selectedThemes;
      }
      if (selectedRegions.length > 0) {
        params['regions'] = selectedRegions;
      }
      if (searchText) {
        params['title'] = searchText;
      }
      // console.log(params);
      const response = await getLikeList(params);
      if (response.status === 200) {
        const newData = response.data;
        // console.log(newData);
        if (newData.length === 0) {
          setLoadInfo({
            likeId: 0,
            updatedAt: '',
          });
          setHasNextPage(false);
        } else {
          const lastItem = newData[newData.length - 1];
          // console.log(lastItem);
          setData((prevData) => [...prevData, ...newData]);
          setLoadInfo({
            likeId: lastItem.likeId,
            updatedAt: lastItem.updatedAt,
          });
        }
      } else {
        setError('data load failure');
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
      // console.log("finally");
    }
  };
  useEffect(() => {
    refetch();
  }, [sortType, selectedThemes, selectedRegions, search]);

  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <div className="header">
        <p className="title">좋아요</p>
        <div className="likeFunction">
          <div className="chips">
            <div className="row">
              <div className="chip">
                {regions.map((region: RegionType) => (
                  <Chip
                    key={region.id}
                    content={region.content}
                    isSelected={selectedRegions.includes(region.value)}
                    id={region.id}
                    value={region.value}
                    onClick={setSelectedRegions}
                  />
                ))}
              </div>
              <Dropdown
                value={sortType.name}
                items={sortMenu}
                onClick={setSortType}
              />
            </div>
            <div className="row">
              <div className="chip">
                {themes.slice(1).map((theme: Theme) => (
                  <Chip
                    key={theme.id}
                    content={theme.id}
                    isSelected={selectedThemes.includes(theme.themeId)}
                    id={theme.themeId}
                    value={theme.themeId}
                    onClick={setSeletedThemes}
                  />
                ))}
              </div>

              <form className="likeInput" onSubmit={onSubmit}>
                <button type="submit" className="icon">
                  <BsSearchHeart size="20" />
                </button>

                <input
                  type="text"
                  placeholder="검색어를 입력하세요."
                  onChange={onChange}
                  value={searchText}
                />
                <button
                  className="icon"
                  onClick={() => {
                    setSearch((prev) => !prev),
                      setSearchText(''),
                      console.log('click');
                  }}
                >
                  <LuDelete size="24" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {data?.length === 0 && <div className="empty">텅</div>}
      {data?.length > 0 && (
        <div className="likes" onScroll={onScroll}>
          {data?.map(
            (
              {
                locationResponse,
                likeId,
                updatedAt,
              }: {
                locationResponse: Recommend;
                likeId: number;
                updatedAt: string;
              },
              index: number
            ) => (
              <Card
                key={locationResponse.locationId + index}
                recommend={locationResponse}
                refetch={refetch}
                onClick={() => onClickCard(locationResponse.locationId)}
              />
            )
          )}
        </div>
      )}

      {/* <div ref={observerTargetRef} style={{ height: "40px" }} /> */}

      {loading && (
        <div className="overContainer">
          <ChatLoader />
        </div>
      )}

      <Modal openModal={openModal} modal={modal} width="51rem" height="46rem">
        <PlaceInfo
          openModal={openModal}
          locationId={selectedLocationId}
          refetch={refetch}
        />
      </Modal>
    </Container>
  );
};

export default Likes;
