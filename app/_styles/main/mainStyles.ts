import styled, { css } from "styled-components";
import { colorTheme } from "../common/commonColorStyles";
import { hideHomeIcons, showHomeIcons } from "../keyframes";

export const HomeContainer = styled.div<{
  $dropdown?: boolean;
  $modal?: boolean;
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

  .logoContainer {
    top: 40%;
    right: 24%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .iconCol {
    position: absolute;
    top: 8%;
    height: 23vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: cen4ter;
    animation: ${({ $dropdown }) =>
      $dropdown === true
        ? css`0.5s ${showHomeIcons} ease-in-out`
        : css`0.5s ${hideHomeIcons} ease-in-out`};
    transition: 0.3s visibility;
    visibility: ${({ $dropdown }) =>
      $dropdown === true ? "visible" : "hidden"};
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
    visibility: ${({ $modal }) => ($modal === true ? "visible" : "hidden")};
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
