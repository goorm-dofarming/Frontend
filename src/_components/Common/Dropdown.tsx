import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import cx from 'classnames';
import { colorTheme } from '@/src/_styles/common/commonColorStyles';
import { SortType } from '@/src/types/aboutLikes';

const DropdownContainer = styled.div`
  width: 142px;
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
      font-size: 14px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      /* text-align: right; */
      padding: 12px;
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
    }
  }
`;
const Dropdown = ({
  value,
  items,
  onClick,
}: {
  value: string;
  items: SortType[];
  onClick: (item: SortType) => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClickDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('onClickDropdown');
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
    <DropdownContainer>
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
              key={item.id + item.name}
              className="item"
              onClick={() => onClick(item)}
            >
              {item.name}
            </li>
          );
        })}
      </menu>
    </DropdownContainer>
  );
};
export default Dropdown;
