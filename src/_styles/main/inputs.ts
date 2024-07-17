import styled from 'styled-components';
import { colorTheme } from '../common/commonColorStyles';

export const InputBorder = styled.div`
  height: 7vh;
  border: 1px solid ${colorTheme.inputBorder};
  input {
    width: 90%;
    outline: none;
    border: none;
    font-family: 'RedHatDisplay_Variable';
  }
  div {
    font-size: 0.8rem;
    font-family: 'RedHatDisplay_Variable';
  }
  &:hover {
    border: 1px solid ${colorTheme.primary};
  }
  .inputRow {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
export const InputLoginBorder = styled(InputBorder)`
  width: 23vw;
  border-radius: 0.3rem 0.3rem 0 0;
  padding: 0.2rem 0.2rem 0.2rem 0.4rem;
`;

export const InputPwdBorder = styled(InputBorder)`
  width: 23vw;
  border-radius: 0 0 0.3rem 0.3rem;
  padding: 0.2rem 0.2rem 0.2rem 0.4rem;
`;

export const InputSignupBorder = styled(InputBorder)`
  width: 23vw;
  border-radius: 0.5rem;
  padding: 0.2rem 0.2rem 0.2rem 0.4rem;
  margin-bottom: 1rem;
`;

export const InputSignupAuthpBorder = styled(InputBorder)`
  width: 19vw;
  border-radius: 0.5rem;
  padding: 0.2rem 0.2rem 0.2rem 0.4rem;
`;
