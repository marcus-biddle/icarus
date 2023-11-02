import React from 'react';
import './Header.css';

interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div style={{ backgroundColor: '#141414'}}>
        {/* Maybe add the pushup button here */}
        <h2 style={{ textAlign: 'left', color: 'gold', margin: '0 56px', padding: '24px 0', fontSize: '40px'}}>
          {title}
        </h2>
    </div>
  )
}

export default Header