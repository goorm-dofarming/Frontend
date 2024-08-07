import styled, { css } from 'styled-components';
import { hideHomeIcons, showHomeIcons } from '../keyframes';
import { colorTheme } from '../common/commonColorStyles';

export const HomeContainer = styled.div<{
  modal: string;
}>`
  width: 100%;
  height: 100%;
  /* header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 1.5rem;
  } */
  main {
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .fog {
    z-index: 1000;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgba(255, 255, 255, 1); /* 반투명 흰색 */
    /* filter: blur(12px); 블러 효과 */
    opacity: 0; /* 초기 투명도 */
  }

  .fog_show {
    
    opacity: 1;
    /* animation-delay:0.5s; */
    animation:fadein 3s ease-in-out;
    @keyframes fadein{
        0%{
          opacity:0;
        }
        70%{
          opacity:0;
        }
        100%{
opacity:1;
        }
    }
  }
  
  .logoContainer {
    top: 35%;
    /* right: 24%; */
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity:1;
  }
  .hideLogo{
    animation:fadeInLogo 3s ease-in-out;
    @keyframes fadeInLogo{
        0%{
          opacity:1;
        }
        50%{
          opacity:0;
        }
        100%{
opacity:0;
        }
    }
  }

  .modal {
    position: absolute;
    width: 35vw;
    height: 75vh;
    z-index: 1;
    top: 15%;
    background-color: white;
    border-radius: 0.5rem;
    // true 말고 show hide로 바꾸기
    visibility: ${({ modal }) => (modal === 'true' ? 'visible' : 'hidden')};
  }
  .mainSection {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .colorMap {
    position: relative;
  }
  .vibration{
    animation: vibration 0.1s infinite;
    animation-delay:1.4s;
  }
  @keyframes vibration {
  from {
    transform: rotate(1deg);
  }
  to {
    transform: rotate(-1deg);
  }
}

  .pin_show {
    position: absolute;
    top:40%;
    left: 65%;
    z-index: 100;
    opacity:1;
      animation: pinAnimation 1.5s ease-out;
      @keyframes pinAnimation {
      from{
        left: 65%;
        top:0%;
        opacity:0;
      }
     /* 80%{
      left: 65%;
      top:45%;
        opacity:1;
      } */
      to{
        left: 65%;
        top:40%;
        opacity:1;
        
      }
    }
  
  }
  .pin_hide {
    position: absolute;
    left: 65%;
    top:50%;
    display: none;
    opacity:0;
    z-index:-100 ;
  }
  .logo {
    width: 100%;
    height: 177px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .hatLogo {
    z-index: 0;
    position: absolute;
  }
  .textLogo {
    position: absolute;
    width: 300px; /* 필요에 따라 조정 */
    height: 60px;
    bottom: 40px;
    font-size: 40px;
    font-weight: 700;
    text-align: center;
    color: ${colorTheme.logoBrownText};
    text-shadow: 1px 1px 4px ${colorTheme.inputBorder};
    text-shadow:
      1px 1px 0 white,
      -1px -1px 0 white,
      1px -1px 0 white,
      -1px 1px 0 white;
  }
  svg {
    width: 100%;
    height: 100%;
  }
  .modalHeader {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .line {
    width: 8vw;
    height: 1px;
    background-color: #ccc;
  }
  .text {
    margin: 0 10px;
    font-size: 16px;
    color: #aaa;
  }
  .socialButtonContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 32%;
  }
`;

export const Input = styled.input`
  outline: none;
  border: none;
`;
