import { RandomPinType } from '@/src/types/aboutMap';
import kakaotalk from '@/src/_assets/main/map/kakaotalk.png';
import link from '@/src/_assets/main/map/link.png';
const imgSrc = `http://${process.env.NEXT_PUBLIC_DEPLOY}/images/share/`;

const makeCOImages = (randomPin: RandomPinType) => {
  let images = ``;
  let count = 0;
  for (let i = 0; i < randomPin.recommends.length; i++) {
    if (count === 4) break;
    const recommend = randomPin.recommends[i];
    if (recommend.image) {
      images += `<img
      src="${recommend.image}"
      alt="${recommend.title}"
      style="width: 110px; height: 72px; object-fit: fill; `;
      switch (count) {
        case 0:
          images += `border-radius: 15px 0 0 0;"`;
          break;
        case 1:
          images += `border-radius: 0 15px 0 0;"`;
          break;
        default:
          images += `"`;
      }
      images += `/>`;
      count += 1;
    }
  }
  return images;
};

export const makeCustomOverlay = (randomPin: RandomPinType) => {
  const images = makeCOImages(randomPin);
  return `
  <div
  id="customOverlay"
    style="
      width: 220px;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background-color: #3e3e3e;
      color: white;
      border-radius: 15px 15px 15px 0; 
      position: relative;
       filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
    "
  >
    <div
      style="
        width: 220px;
        height:144px;
        display: grid;
        grid-template-columns: 1fr 1fr;
      "
    >
 ${images}
  
    </div>
    <div
      style="
        padding:8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      "
    >
      <div
        style="
          text-align: left;
          margin-right: 5px;
          width:70%;
        "
      >
        <p style="width:100%; white-space: nowrap;
    overflow-y: hidden;
    text-overflow: ellipsis; margin: 0; font-size: 12px;">${randomPin.address}</p>
        <p style="margin: 0; font-size: 12px; color: #ccc;">
          ${randomPin?.theme}
        </p>
      </div>
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          gap:4px;
        "
      >
        <!-- 버튼 또는 추가 UI 요소를 여기에 추가할 수 있습니다 -->
        <button
            type="button"
        id="share-kakaotalk"
        style="background :none; border:none;cursor:pointer;">
          <img src=${imgSrc + 'kakaotalk.png'} alt="kakaotalk"  style="width: 28px; height: 28px; "/>
        </button>
         <button
         type="button"
        id="share-link"
         style="background :none; border:none;cursor:pointer;">
          <img src=${imgSrc + 'link.png'} alt="link"  style="width: 24px; height: 24px; "/>
        </button>
      </div>
    </div>
  </div>
`;
};

export const makeInfoWindow = (title: string) => {
  return `<div style="width:150px;
background-color:white;
text-align:center;padding:8px; font-size:16px;
white-space: nowrap;
    overflow: hidden;
text-overflow:ellipsis;  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
    drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));">${title}</div>`;
};

export const makeShareWindow = () => {
  const script = document.createElement('script');
  const KAKAO_JS_SDK_URL = `https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js`;
  script.src = KAKAO_JS_SDK_URL;
  document.head.appendChild(script);

  script.onload = () => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init('8340178facebe8ebb2f804b95925836b');
        console.log('script:', window.Kakao);

        window.Kakao.Share.createDefaultButton({
          container: '#share-kakaotalk', // 공유 버튼을 삽입할 HTML 요소의 ID
          objectType: 'feed',
          content: {
            title: '디지털농업투어',
            description: '농업 관련 다양한 투어를 즐겨보세요!',
            imageUrl: `http://${process.env.NEXT_PUBLIC_DEPLOY}/images/sample.jpg`,
            link: {
              mobileWebUrl: `${window.location.href}`,
              webUrl: `${window.location.href}`,
            },
          },
        });
      }
    } else {
      console.error('Kakao SDK failed to load.');
    }
  };
};
