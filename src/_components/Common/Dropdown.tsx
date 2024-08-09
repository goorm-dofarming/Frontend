import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import cx from 'classnames';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';
import { SortType } from '@/src/types/aboutLikes';

const DropdownContainer = styled.div<{
  width?: string;
  fontSize?: string;
  padding?: string;
}>`
  width: ${({ width }) => (width ? width : '142px')};
  height: 40px;
  position: relative;
  border: 1px solid ${colorTheme.secondary};
  color: ${colorTheme.secondary};
  border-radius: 2px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  > .icon {
    transform: rotate(0);
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    &.isOpen {
      transform: rotate(180deg);
    }
  }
  .dropdownInfo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
  }

  .itemWrapper {
    pointer-events: none;
    position: absolute;
    top: 112%;
    left: 0;
    z-index: 20;
    width: 100%;
    background-color: none;
    border-radius: 2px;
    visibility: hidden;
    /* overflow-y: scroll; */
    transform: scale(0.6);
    transform-origin: left top;
    transition:
      transform 0.3s ease-in-out,
      visibility 0.3s ease-in-out;
    &.isOpen {
      max-height: 174px;
      visibility: visible;
      transform: scale(1);
      pointer-events: auto;
    }

    .item {
      font-size: ${({ fontSize }) => (fontSize ? fontSize : '14px')};
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      /* text-align: right; */
      padding: ${({ padding }) => (padding ? padding : '12px')};
      background-color: ${colorTheme.secondary};
      border-left: 1px solid white;
      border-right: 1px solid white;
      border-bottom: 1px solid white;
      color: white;
      list-style-type: none;
      &:hover {
        background-color: white;
        color: ${colorTheme.secondary};
      }
      &:nth-of-type(1) {
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
      }
      &:nth-of-type(4) {
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
      }
    }
  }
`;
const Dropdown = ({
  type,
  value,
  items,
  onClick,
  width,
  fontSize,
  padding,
}: {
  type?: string;
  value: string;
  items: any[];
  onClick: (item: any) => void;
  width?: string;
  fontSize?: string;
  padding?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClickDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log('onClickDropdown');
    if ((e.target as HTMLElement).classList.contains('icon')) {
      e.stopPropagation();
    }
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [isOpen]);

  return (
    <DropdownContainer width={width} fontSize={fontSize} padding={padding}>
      <div ref={ref} onClick={onClickDropdown} className={cx('dropdownInfo')}>
        {value}
        {isOpen ? (
          <IoIosArrowUp className={cx('icon', { ['isOpen']: isOpen })} />
        ) : (
          <IoIosArrowDown className={cx('icon', { ['isOpen']: isOpen })} />
        )}
      </div>
      <menu className={cx('itemWrapper', { ['isOpen']: isOpen })}>
        {items.map((item) => {
          return (
            <li
              key={item.id + item.value}
              className="item"
              onClick={() => onClick(item)}
            >
              {type === 'chat' ? item.value : item.content}
            </li>
          );
        })}
      </menu>
    </DropdownContainer>
  );
};
export default Dropdown;
