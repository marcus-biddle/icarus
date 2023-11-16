import { MutableRefObject, useCallback, useEffect } from 'react';

export const useOutsideClick = (ref: MutableRefObject<null | Element>, callback: () => void): void => {
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  }, [ref]) ;
  
  useEffect(() => {
    console.log('useOutsideClick')
    // Added Callback and moved outside

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};