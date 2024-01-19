import { useCallback, useEffect, useState } from 'react';

interface MobileProps {
  threshold?: number
}

const MOBILE_THRESHOLD = 800;

export const useIsMobile = ({ threshold = MOBILE_THRESHOLD }: MobileProps) => {
  
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' && window.innerWidth <= threshold);

  const handleResize = useCallback(() => {
    const newIsMobile = window.innerWidth <= threshold;
    setIsMobile(newIsMobile);
  }, []); 
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
}

