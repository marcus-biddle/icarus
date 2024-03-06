import React from 'react'
import TwoColumnGrid from '../../components/Grid/TwoColumnGrid'
import { NavLink } from 'react-router-dom';
import { GiBiceps } from "react-icons/gi";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useIsMobile } from '../../hooks/useIsMobile';

const History = () => {
    const isMobile = useIsMobile({});
    const eventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId);

  return (
    <TwoColumnGrid showSecondColumnInMobile={true}>
        <div style={{ borderBottom: '1px solid #1E293B', paddingBottom: '8px', textAlign: 'left' }}>
            <h4 style={{ fontWeight: '700', letterSpacing: '1.12px', textTransform: 'capitalize'}}>{eventId} History</h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: isMobile ? '72px 24px 0 24px' : '72px 0 0 0'}}>
            {/* <div className='container' style={{ textAlign: 'left', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <h6 style={{ margin: '0', fontSize: '24px', fontWeight: '700', letterSpacing: '.85px'}}>Week</h6>
                <p style={{ fontSize: '14px'}}>Check everyone's total for each day of the week.</p>
                <div style={{ padding: '16px 0 0 0'}}>
                    <NavLink to={'week'}>
                        <button style={{ padding: '12px 32px', backgroundColor: 'transparent', border: '1px solid white', fontWeight: '100', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '10px'}}>View Past</button>
                    </NavLink>
                </div>
                <div>
                    <GiBiceps style={{ position: 'absolute', width: '200px', height: '200px', transform: 'rotate(-30deg)', opacity: '.25', right: '0', top: '-20px'}} />
                </div>
            </div> */}
            <div className='container' style={{ textAlign: 'left', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <h6 style={{ margin: '0', fontSize: '24px', fontWeight: '700', letterSpacing: '.85px'}}>Month</h6>
                <p style={{ fontSize: '14px'}}>Check everyone's total for each week of the month.</p>
                <div style={{ padding: '16px 0 0 0'}}>
                    <NavLink to={'month'}>
                        <button style={{ padding: '12px 32px', backgroundColor: 'transparent', border: '1px solid white', fontWeight: '100', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '10px'}}>View Past</button>
                    </NavLink>
                </div>
                <div>
                    <GiBiceps style={{ position: 'absolute', width: '200px', height: '200px', transform: 'rotate(-30deg)', opacity: '.25', right: '0', top: '-20px'}} />
                </div>
            </div>
            <div className='container' style={{ textAlign: 'left', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <h6 style={{ margin: '0', fontSize: '24px', fontWeight: '700', letterSpacing: '.85px'}}>Year</h6>
                <p style={{ fontSize: '14px'}}>Check everyone's total for each month of the year.</p>
                <div style={{ padding: '16px 0 0 0'}}>
                    <NavLink to={'year'}>
                        <button style={{ padding: '12px 32px', backgroundColor: 'transparent', border: '1px solid white', fontWeight: '100', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '10px'}}>View Past</button>
                    </NavLink>
                </div>
                <div>
                    <GiBiceps style={{ position: 'absolute', width: '200px', height: '200px', transform: 'rotate(-30deg)', opacity: '.25', right: '0', top: '-20px'}} />
                </div>
            </div>
        </div>
    </TwoColumnGrid>
  )
}

export default History