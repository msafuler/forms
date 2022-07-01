import { useState, useEffect } from 'react';

export const useClickOutside = (element, initialState) => {

  const [open, setOpen] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e) => {


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
