import { MutableRefObject, useCallback, useEffect } from 'react';

export const useOutsideClick = (ref: MutableRefObject<null | Element>, callback: () => void): void => {
  
  // function that runs the callback when it is outside of the ref container
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  }, [ref]) ;
  
  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};