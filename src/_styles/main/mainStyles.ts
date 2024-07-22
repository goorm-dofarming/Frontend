import styled, { css } from "styled-components";
import { hideHomeIcons, showHomeIcons } from "../keyframes";

export const HomeContainer = styled.div<{
  dropdown: string;
  modal: string;
}>`
  width: 100%;
  height: 100%;
  header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 1.5rem;
  }
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
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1); /* 반투명 흰색 */
    filter: blur(12px); /* 블러 효과 */
    opacity: 0; /* 초기 투명도 */
    transition: opacity 2s; /* 부드러운 전환 효과 */
  }

  .fog_show {
    opacity: 1;
  }
  .logoContainer {
    top: 40%;
    /* right: 24%; */
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .iconCol {
    position: absolute;
    top: 8%;
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: cen4ter;
    animation: ${({ dropdown }) =>
      dropdown === "true"
        ? css`0.5s ${showHomeIcons} ease-in-out`
        : css`0.5s ${hideHomeIcons} ease-in-out`};
    transition: 0.3s visibility;
    visibility: ${({ dropdown }) =>
      dropdown === "true" ? "visible" : "hidden"};
  }
  .iconBg {
    width: 3vw;
    height: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: #efefef;
      border-radius: 20%;
    }
  }
  .icons {
    cursor: pointer;
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
    visibility: ${({ modal }) => (modal === "true" ? "visible" : "hidden")};
  }
  .mainSection {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .colorMap {
    position: relative;
  }

  .pin_show {
    position: absolute;
    left: 0;
    z-index: 100;
    transform-style: preserve-3d;
    animation: pinAnimation 1.6s ease-in-out;

    @keyframes pinAnimation {
      0% {
        transform: translateX(0) translateZ(0) scale(0) rotateX(0) rotateY(0)
          rotateZ(0);
      }
      50% {
        transform: translateX(50vw) translateZ(-50px) scale(10) rotateX(30deg)
          rotateY(30deg) rotateZ(30deg);
      }
      100% {
        transform: translateX(65vw) translateZ(0) scale(0) rotateX(0) rotateY(0)
          rotateZ(0);
      }
    }
  }
  .pin_hide {
    display: none;
  }
  .logo {
    z-index: 0;
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
