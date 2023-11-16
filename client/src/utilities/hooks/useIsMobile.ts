import { useEffect, useState } from 'react';

const MOBILE_THRESHOLD = 768; // Adjust as needed

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= MOBILE_THRESHOLD);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_THRESHOLD);
      console.log('useIsMobile')
    };

    // Throttle or debounce handleResize if needed

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
}

