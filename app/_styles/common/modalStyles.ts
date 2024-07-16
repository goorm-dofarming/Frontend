import styled from 'styled-components';

export const ModalContainer = styled.div<{
  $modal: boolean;
  width: string;
  height: string;
}>`
  position: absolute;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  z-index: 1;
  top: 15%;
  background-color: white;
  border-radius: 0.5rem;
  visibility: ${({ $modal }) => ($modal === true ? 'visible' : 'hidden')};
  .logo {
    z-index: 0;
  }
  .modalHeader {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
`;
