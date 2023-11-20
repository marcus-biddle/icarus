import React, { ReactNode } from 'react';
import './index.css';

interface DynamicButtonProps {
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit'
  onClick?: () => void;
  children?: ReactNode;
}

export const Button= ({ size = 'medium', type = 'button', onClick, children }: DynamicButtonProps) => {
  const buttonStyle = {
    fontSize: size === 'large' ? '18px' : size === 'small' ? '14px' : '16px',
    padding: size === 'large' ? '6px 24px' : size === 'small' ? '8px 12px' : '10px 16px',
  };

  return (
    <button className={`dynamic-button ${size}`} style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};
