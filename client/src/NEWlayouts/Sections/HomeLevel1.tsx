import React, { useRef, useState } from 'react';

import './index.css';
import { DynamicIcon } from '../../components/Icons/DynamicIcon';
import HoverMenu from '../../components/Menu/HoverMenu';
import StatsBar from '../../components/StatsBar/StatsBar';
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import { NavLink } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const COLORS = ['#24a876', '#e83ce8'];

const HomeLevel1 = () => {
  const [color, setColor] = useState(COLORS[0]);
  const isMobile = useIsMobile({});

  const handleColorChange = (index: number) => {
    
    setColor(COLORS[index])
  }

  return (
    <div className={isMobile ? 'two-row-container' : "two-column-container"}>
      <div className="left-column" style={{ padding: isMobile ? '0' : '20px', minHeight: isMobile ? '80vh' : ''}}>
        {/* Content for the left column */}
        <div className={isMobile ? 'mobile-sections' : 'desktop-sections'}>
          {isMobile && <Carousel showArrows={false} showThumbs={false} showStatus={false} onChange={(index) => handleColorChange(index)}>
          <div className={isMobile ? 'mobile-section-card' : 'section-card'} style={{ backgroundColor: '#24a876' }}>
            <div className={isMobile ? 'mobile-content-container' : ''}>
              <h6 style={{ fontSize: '13px', backgroundColor: isMobile ? '' : '#2ccd8fac', display: 'inline-block', margin: '0', borderRadius: '4px', padding: '2px 4px', textAlign: 'center'}}>PUSHUP A1</h6>
              <h4 style={{ fontWeight: '700', color: 'white', fontStyle: ''}}>Section 1: Beginner</h4>
              {isMobile && <NavLink to={'details/1'} style={{ fontWeight: '700', textDecoration: 'none', color: 'inherit', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '14px'}}>See Details</NavLink>}
              <div style={{ margin: '8px'}}>Progress bar</div>
              <div>
                <button className='start-btn' style={{ boxShadow: isMobile ? '' : '0 4px 6px rgba(0,0,0,0.4)', width: isMobile ? '90%' : '', marginRight: isMobile ? '' : '24px'}}>
                  <NavLink to={''}>Start</NavLink>
                </button>
                {!isMobile && <NavLink to={'details/1'} style={{ fontWeight: '700', textDecoration: 'none', color: 'inherit', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '14px'}}>See Details</NavLink>}
              </div>
            </div>
          </div>


          <div className={isMobile ? 'mobile-section-card' : 'section-card'} style={{ backgroundColor: '#e83ce8' }}>
            <div className={isMobile ? 'mobile-content-container' : ''}>
              <h6 style={{ fontSize: '13px', backgroundColor: isMobile ? '' : '#2ccd8fac', display: 'inline-block', margin: '0', borderRadius: '4px', padding: '2px 4px', textAlign: 'center'}}>PUSHUP A1</h6>
              <h4 style={{ fontWeight: '700', color: 'white', fontStyle: ''}}>Section 1: Beginner</h4>
              {isMobile && <NavLink to={'details/1'} style={{ fontWeight: '700', textDecoration: 'none', color: 'inherit', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '14px'}}>See Details</NavLink>}
              <div style={{ margin: '8px'}}>Progress bar</div>
              <div>
                <button className='start-btn' style={{ boxShadow: isMobile ? '' : '0 4px 6px rgba(0,0,0,0.4)', width: isMobile ? '90%' : '', marginRight: isMobile ? '' : '24px'}}>
                  <NavLink to={''}>Start</NavLink>
                </button>
                {!isMobile && <NavLink to={'details/1'} style={{ fontWeight: '700', textDecoration: 'none', color: 'inherit', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '14px'}}>See Details</NavLink>}
              </div>
            </div>
          </div>
          </Carousel>}
          {!isMobile && <>
            <div className={isMobile ? 'mobile-section-card' : 'section-card'}>
            <div className={isMobile ? 'mobile-content-container' : ''}>
              <h6 style={{ fontSize: '13px', backgroundColor: isMobile ? '' : '#2ccd8fac', display: 'inline-block', margin: '0', borderRadius: '4px', padding: '2px 4px', textAlign: 'center'}}>PUSHUP A1</h6>
              <h4 style={{ fontWeight: '700', color: 'white', fontStyle: ''}}>Section 1: Beginner</h4>
              {isMobile && <NavLink to={'details/1'} style={{ fontWeight: '700', textDecoration: 'none', color: 'inherit', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '14px'}}>See Details</NavLink>}
              <div style={{ margin: '8px'}}>Progress bar</div>
              <div>
                <button className='start-btn' style={{ boxShadow: isMobile ? '' : '0 4px 6px rgba(0,0,0,0.4)', width: isMobile ? '90%' : '', marginRight: isMobile ? '' : '24px'}}>
                  <NavLink to={''}>Start</NavLink>
                </button>
                {!isMobile && <NavLink to={'details/1'} style={{ fontWeight: '700', textDecoration: 'none', color: 'inherit', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '14px'}}>See Details</NavLink>}
              </div>
            </div>
          </div>
          <div className={isMobile ? 'mobile-section-card' : 'section-card'}>
            <div className={isMobile ? 'mobile-content-container' : ''}>
              <h6 style={{ fontSize: '13px', backgroundColor: isMobile ? '' : '#2ccd8fac', display: 'inline-block', margin: '0', borderRadius: '4px', padding: '2px 4px', textAlign: 'center'}}>PUSHUP A1</h6>
              <h4 style={{ fontWeight: '700', color: 'white', fontStyle: ''}}>Section 1: Beginner</h4>
              {isMobile && <NavLink to={'/'} style={{ fontWeight: '700', textDecoration: 'none', color: 'inherit', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '14px'}}>See Details</NavLink>}
              <div style={{ margin: '8px'}}>Progress bar</div>
              <div>
                <button className='start-btn' style={{ width: isMobile ? '90%' : '', marginRight: isMobile ? '' : '24px'}}>
                  <NavLink to={''}>Start</NavLink>
                </button>
                {!isMobile && <NavLink to={'/'} style={{ fontWeight: '700', textDecoration: 'none', color: 'inherit', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '14px'}}>See Details</NavLink>}
              </div>
            </div>
          </div>
          </>}
        </div>
      </div>
      <div className="right-column" style={{ borderBottom: isMobile ? '1px solid grey' : '', backgroundColor: isMobile ? color : '', zIndex: '1', boxShadow: isMobile ? '0 4px 6px rgba(0,0,0,0.3)' : ''}}>
        {/* Content for the right column */}
        <StatsBar />
      </div>
    </div>
  )
}

export default HomeLevel1