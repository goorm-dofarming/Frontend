import styled, { css } from "styled-components";
import { colorTheme } from "../common/commonColorStyles";
import { hideHomeIcons, showHomeIcons } from "../keyframes";

export const HomeContainer = styled.div<{
  $dropdown?: boolean;
  $modal?: boolean;
}>`
  width: 100%;
  height: 100%;
  background-color: ${({ $modal }) =>
    $modal === true && colorTheme.modelOpenBg};
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
    /* right: 24%; */
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
  .mainSection {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .logo {
    z-index: 0;
  }
  .modalHeader {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .modalContents {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .authContainer {
    width: 23vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;

    button {
      width: 3vw;
      height: 60%;
      border: 1px solid ${colorTheme.primary};
      color: ${colorTheme.primary};
      background-color: white;
      border-radius: 0.2rem;

      &:hover {
        cursor: pointer;
        color: white;
        background-color: ${colorTheme.primary};
      }
    }
  }
  .limitTime {
    width: 23vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    span {
      color: ${colorTheme.primary};
      font-family: "RedHatDisplay_Variable";
    }
  }
  .socialContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 20px 0;
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
  .ment {
    color: #bdb8b8;
    font-size: 0.8rem;
    font-family: "RedHatDisplay_Variable";
  }
  .ment2 {
    color: #bdb8b8;
    font-weight: 800;
    font-size: 0.9rem;
    font-family: "RedHatDisplay_Variable";
    margin-left: 0.3rem;
  }
  .ment3 {
    color: ${colorTheme.primary};
    font-size: 0.8rem;
    font-family: "RedHatDisplay_Variable";
  }
  .signupSocialContainer {
    width: 23vw;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 0.6rem;
  }
`;

export const Input = styled.input`
  outline: none;
  border: none;
`;
