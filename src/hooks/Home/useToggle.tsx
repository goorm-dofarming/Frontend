import { Dispatch, SetStateAction } from 'react';
const useToggle = (
  state: boolean,
  setState: React.Dispatch<SetStateAction<boolean>>
) => {
  function toggle() {
    setState(!state);
  }
  return toggle;
};

export default useToggle;
