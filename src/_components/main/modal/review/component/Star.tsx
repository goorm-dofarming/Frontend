import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StarContainer = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;
  user-select: none;
`;

interface StarProps {
  $filled: number;
  $size: number;
}

const Star = styled.div<StarProps>`
  width: ${(props) => props.$size}rem;
  height: ${(props) => props.$size}rem;
  background: ${(props) =>
    props.$filled === 1
      ? '#FFD700'
      : `linear-gradient(90deg, #FFD700 ${props.$filled * 100}%, #e4e5e9 ${props.$filled * 100}%)`};
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
`;

interface StarScoreProps {
  value: number;
  size: number;
  onChange?: (value: number) => void;
}

const StarScore: React.FC<StarScoreProps> = ({ value, size, onChange }) => {
  const [dragging, setDragging] = useState(false);
  const [hoverValue, setHoverValue] = useState<number>(value);

  useEffect(() => {
    setHoverValue(value); // value가 변경되면 hoverValue도 업데이트
  }, [value]);

  const calculateRating = (event: React.MouseEvent) => {
    const { width, left } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const newRating = Math.ceil((x / width) * 10) / 2;
    return newRating;
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (onChange) {
      const newRating = calculateRating(event);
      setHoverValue(newRating);
      onChange(newRating);
      setDragging(true);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (dragging && onChange) {
      const newRating = calculateRating(event);
      setHoverValue(newRating);
      onChange(newRating);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };
  return (
    <StarContainer
      onMouseDown={onChange ? handleMouseDown : undefined} // onChange가 없으면 이벤트 핸들러 비활성화
      onMouseMove={onChange ? handleMouseMove : undefined} // onChange가 없으면 이벤트 핸들러 비활성화
      onMouseUp={onChange ? handleMouseUp : undefined} // onChange가 없으면 이벤트 핸들러 비활성화
      onMouseLeave={() => setDragging(false)}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const starFilled = Math.min(Math.max(hoverValue - i, 0), 1); // 0에서 1 사이의 값을 가져옴
        return <Star key={i} $filled={starFilled} $size={size} />;
      })}
    </StarContainer>
  );
};

export default StarScore;
