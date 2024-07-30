import styled from 'styled-components';
import { colorTheme } from '../common/commonColorStyles';

export const LogContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  h3 {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .logContainer {
    width: 20%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-shadow: 1px 4px 5px 1px gray;
    padding: 0.5rem;
    overflow-y: scroll;
  }

  .logContainer::-webkit-scrollbar {
    display: none;
  }
  .logContent {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .log {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    padding: 0.5rem;
    margin-bottom: 0.2rem;

    &:hover {
      border-radius: 0.5rem;
      background-color: ${colorTheme.teritiary};
      color: white;
    }
  }
  .logDate {
    font-size: 1rem;
    font-weight: 400;
    width: 100%;
    font-family: 'RedHatDisplay_Variable';
  }
  .logAddress {
    width: 100%;
    font-weight: 800;
  }
  .logTheme {
    font-size: 0.8rem;
    width: 100%;
  }
  .divider {
    border-bottom: 1px solid #efefef;
  }
  .logSideContent {
    position: absolute;
    right: 0;
    width: 28%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* border: 2px solid #efefef; */
    z-index: 1;
    header {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      padding-right: 1.5rem;
      /* background-color: yellowgreen; */
    }
    main {
      overflow-y: auto;
      height: 90vh;
    }
    main::-webkit-scrollbar {
      display: none;
    }
  }

  .Container {
    padding: 12px;
    gap: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .kakaoMap {
    width: 100%;
    height: 100%;
  }
`;
