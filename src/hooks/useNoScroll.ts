import { useEffect } from 'react';

const useNoScroll = (menuOpen: boolean) => {
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [menuOpen]);
};

export default useNoScroll;
