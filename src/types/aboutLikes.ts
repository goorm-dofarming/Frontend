export const regions: RegionType[] = [
    {
      id: 1,
      value: '서울특별시',
      content: '서울',
    },
    {
      id: 2,
      value: '인천광역시',
      content: '인천',
    },
    {
      id: 3,
      value: '울산광역시',
      content: '울산',
    },
    {
      id: 4,
      value: '부산광역시',
      content: '부산',
    },
    {
      id: 5,
      value: '대구광역시',
      content: '대구',
    },
    {
      id: 6,
      value: '광주광역시',
      content: '광주',
    },
    {
      id: 7,
      value: '대전광역시',
      content: '대전',
    },
    {
      id: 8,
      value: '세종특별자치시',
      content: '세종',
    },
    {
      id: 9,
      value: '경기도',
      content: '경기',
    },
    {
      id: 10,
      value: '충청북도',
      content: '충북',
    },
    {
      id: 11,
      value: '충청남도',
      content: '충남',
    },
    {
      id: 12,
      value: '경상남도',
      content: '경남',
    },
    {
      id: 13,
      value: '경상북도',
      content: '경북',
    },
    {
      id: 14,
      value: '전라남도',
      content: '전남',
    },
    {
      id: 15,
      value: '전북특별자치도',
      content: '전북',
    },
    {
      id: 16,
      value: '제주특별자치도',
      content: '제주',
    },
    {
      id: 17,
      value: '강원특별자치도',
      content: '강원',
    }
  ];
  

export interface RegionType {
    id:number;
    value:string;
    content:string;
}



export const sortMenu:SortType[] = [{
    id:1,
    value:"Latest",
    name:"최신순"
  },
  {
    id:2,
    value:"Earliest",
    name:"오래된순"
  },
  {
    id:3,
    value:"HighLike",
    name:"좋아요 많은 순"
  },
  {
    id:4,
    value:"LowLike",
    name:"좋아요 적은 순"
  },
  ]
export interface SortType{
    id:number;
    value:string;
    name:string;
}