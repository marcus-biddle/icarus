import { useCallback, useEffect, useState } from 'react';

const MOBILE_THRESHOLD = 768; // Adjust as needed

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= MOBILE_THRESHOLD);

  const handleResize = useCallback(() => {
    const newIsMobile = window.innerWidth <= MOBILE_THRESHOLD;
    setIsMobile(newIsMobile);
    console.log('useIsMobile');
  }, []); // Empty dependency array means the callback will not change unless MOBILE_THRESHOLD changes


  // Throttle or debounce handleResize if needed
  
  useEffect(() => {
    

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
}

