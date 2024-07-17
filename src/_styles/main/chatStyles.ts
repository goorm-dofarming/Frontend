import styled, { css } from "styled-components";
import { colorTheme } from "../common/commonColorStyles";

export const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  font-family: "RedHatDisplay_Variable";

  .chatList {
    width: 25rem;
    border-right: 1px solid ${colorTheme.divider};
  }

  .chatSpace {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
