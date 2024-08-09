import styled from 'styled-components';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';
import { Dispatch, SetStateAction } from 'react';

interface ChipContainerProps {
  $isselected: string;
}

const ChipContainer = styled.button<ChipContainerProps>`
  /* width: 80px;*/
  height: 36px;
  white-space: nowrap;
  display: inline-block;
  padding: 0px 20px;
  letter-spacing: 2px;
  background-color: ${(props) =>
    props.$isselected === 'true' ? `${colorTheme.secondary}` : 'white'};
  border: ${(props) =>
    props.$isselected === 'true'
      ? '1px solid white'
      : `1px solid ${colorTheme.secondary}`};
  color: ${(props) =>
    props.$isselected === 'true' ? 'white' : `${colorTheme.secondary}`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: ${colorTheme.secondary};
    border: 1px solid white;
    color: white;
  }
`;

const Chip = ({
  content,
  isSelected,
  id,
  onClick,
  value,
}: {
  content: string;
  isSelected: boolean;
  id: number;
  value: any;
  onClick: any;
}) => {
  const onClickChip = () => {
    if (isSelected) {
      onClick((prev: any) => {
        const newArr = [...prev].filter((v) => v !== value);
        return newArr;
      });
    } else {
      onClick((prev: any) => {
        // console.log(prev);
        const newArr = [...prev, value];
        return newArr;
      });
    }
  };
  return (
    <ChipContainer onClick={onClickChip} $isselected={isSelected.toString()}>
      {content}
    </ChipContainer>
  );
};
export default Chip;
