import { useState, useEffect } from 'react';

export const useClickOutside = (element, initialState) => {

  const [open, setOpen] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e) => {
      console.log('pageClickEvent', element.current.contains(e.target));

      if (element.current !== null && !element.current.contains(e.target)) {
        setOpen(!open);
      }
    };
    if (open) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    }
  }, [open, element]);

  return [open,setOpen];
};
