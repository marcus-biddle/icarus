import React, { ReactNode, useState } from 'react';
import './HoverMenu.css';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface HoverMenuProps {
    icon: ReactJSXElement;
    children: ReactNode;
    text: string;
  }

const HoverMenu = ({ icon, children, text }: HoverMenuProps) => {
    const [isHovered, setIsHovered] = useState(false);
    

    return (
        <div className="hover-menu-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className={`text-container ${isHovered ? 'hovered' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'}}>
                    {icon}
                    <p style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '1.12px', textTransform: 'capitalize'}}>{text}</p>
                </div>
            
            </div>
            {isHovered && (
            <div className="menu-container">
                {children}
            </div>
            )}
        </div>
    )
}

export default HoverMenu