import React, { ReactNode } from 'react';
import './index.css';

interface DynamicButtonProps {
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children?: ReactNode;
}

export const IconButton= ({ size = 'medium', onClick, children }: DynamicButtonProps) => {
    // More rounded square look.
  const buttonStyle = {
    fontSize: size === 'large' ? '20px' : size === 'small' ? '14px' : '16px',
    padding: size === 'large' ? '12px 20px' : size === 'small' ? '8px 12px' : '18px',
  };

  return (
    <button className={`icon-button ${size}`} style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};