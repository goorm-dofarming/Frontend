import styled from 'styled-components';
import { colorTheme } from './commonColorStyles';

export const InputBorder = styled.div`
  height: 7vh;
  border: 2px solid ${colorTheme.inputBorder};
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0.3rem;
  input {
    width: 100%;
    outline: none !important;
    border: none !important;
    font-family: 'RedHatDisplay_Variable';
    color: #5a5a5a;
    font-weight: 500;
  }
  div {
    outline: none !important;
    /* border: none !important; */
    font-size: 0.8rem;
    font-family: 'RedHatDisplay_Variable';
  }
  &:hover {
    border: 2px solid ${colorTheme.primary};
  }
  transition: border 0.3s ease-in-out;
  .inputRow {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

interface InputBorderStringProps {
  $ischanging?: string | null;
}

export const InputLoginBorder = styled(InputBorder)<InputBorderStringProps>`
  width: 23vw;
  /* border-radius: 0.3rem 0.3rem 0 0; */

  padding: 0.2rem 0.2rem 0.2rem 0.4rem;
  border: ${(props) =>
    props.$ischanging === 'email' && `2px solid ${colorTheme.primary}`};
  .inputInMent {
    font-family: 'NanumBarunGothic';
    color: #a09f9f;
    font-weight: 545;
  }
  input {
    font-size: 16px;
  }
`;

export const InputPwdBorder = styled(InputBorder)<InputBorderStringProps>`
  width: 23vw;
  /* border-radius: 0 0 0.3rem 0.3rem; */
  padding: 0.2rem 0.2rem 0.2rem 0.4rem;
  border: ${(props) =>
    props.$ischanging === 'password' && `2px solid ${colorTheme.primary}`};
  .inputInMent {
    font-family: 'NanumBarunGothic';
    color: #a09f9f;
    font-weight: 545;
  }
  input {
    font-size: 16px;
  }
`;

interface InputBorderBooleanProps {
  $ischanging?: boolean;
}

export const InputSignupBorder = styled(InputBorder)<InputBorderBooleanProps>`
  width: 23vw;
  /* border-radius: 0.5rem; */
  padding: 0.2rem 0.2rem 0.2rem 0.4rem;
  margin-bottom: 1rem;
  border: ${(props) => props.$ischanging && `2px solid ${colorTheme.primary}`};
  .inputInMent {
    font-family: 'NanumBarunGothic';
    color: #a09f9f;
    font-weight: 545;
  }
  input {
    font-size: 16px;
  }
`;

export const InputSignupAuthpBorder = styled(
  InputBorder
)<InputBorderBooleanProps>`
  width: 19vw;
  /* border-radius: 0.5rem; */
  padding: 0.2rem 0.2rem 0.2rem 0.4rem;
  border: ${(props) => props.$ischanging && `2px solid ${colorTheme.primary}`};
  .inputInMent {
    font-family: 'NanumBarunGothic';
    color: #a09f9f;
    font-weight: 545;
  }
  input {
    font-size: 16px;
  }
`;
