import { useCallback, useEffect, useState } from 'react';

interface MobileProps {
  threshold?: number
}

const MOBILE_THRESHOLD = 768;

export const useIsMobile = ({ threshold = MOBILE_THRESHOLD }: MobileProps) => {
  
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' && window.innerWidth <= threshold);

  const handleResize = useCallback(() => {
    const newIsMobile = window.innerWidth <= threshold;
    setIsMobile(newIsMobile);
    console.log('useIsMobile');
  }, []); // Empty dependency array means the callback will not change unless MOBILE_THRESHOLD changes
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
}

