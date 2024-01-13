import React, { ReactNode, useState } from 'react';
import './HoverMenu.css';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface HoverMenuProps {
    icon: ReactJSXElement;
    children: ReactNode;
  }

const HoverMenu = ({ icon, children }: HoverMenuProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="hover-menu-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className={`text-container ${isHovered ? 'hovered' : ''}`}>
            {icon}
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