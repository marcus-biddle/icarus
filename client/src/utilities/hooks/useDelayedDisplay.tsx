import { useState, useEffect, ReactNode } from 'react';

interface UseDelayedDisplayProps {
  delay: number; 
}

export const useDelayedDisplay = ({ delay }: UseDelayedDisplayProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  const WrappedComponent = ({ children }: { children: ReactNode}) => (
    <div style={{ display: isVisible ? 'block' : 'none' }}>{children}</div>
  );

  return WrappedComponent;
};
