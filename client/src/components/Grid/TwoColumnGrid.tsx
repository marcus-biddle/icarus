import React, { ReactNode } from 'react'
import StatsBar from '../StatsBar/StatsBar'
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import './index.css'
import { NavLink } from 'react-router-dom';
import { LEAGUE_LEVELS } from '../../NEWlayouts/Leaderboard/Leaderboard';
import { DynamicIcon } from '../Icons/DynamicIcon';
import { GiLaurelsTrophy } from "react-icons/gi";
import { Show } from '../../helpers/functional';

const TwoColumnGrid = ({ children, showSecondColumnInMobile }: { children: ReactNode, showSecondColumnInMobile: boolean }) => {
    const isMobile = useIsMobile({});

  return (
    <div className={"two-column-container"} style={{ flexDirection: isMobile ? 'column-reverse' : 'row', width: isMobile ? '100%' : ''}}>
          <div className="left-column" style={{ padding: isMobile ? '0' : '20px', height: isMobile ? '80vh' : '' }}>
            {children}
          </div>
          
          <div className="right-column">
            <Show when={showSecondColumnInMobile || !isMobile}>
              <StatsBar />
            </Show>
            
            <Show when={!isMobile}>
              <div className='container' style={{ margin: '24px 0', padding: '0 24px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', padding: '10px 0'}}>
                  <span style={{ fontWeight: '700'}}>[Month] Events</span>
                  <NavLink to={'/duo/history'} style={{ fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '13px', color: 'lightblue'}}>
                    View History
                  </NavLink>
                </div>
                <div style={{ padding: '10px 0 24px 0', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <span>Pushups</span>
                    <span>100</span>
                    <span>200 XP</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <span>Pullups</span>
                    <span>75</span>
                    <span>100 XP</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <span>Running</span>
                    <span>20</span>
                    <span>300 XP</span>
                  </div>
                </div>
              </div>
              <div className='container' style={{ margin: '24px 0', padding: '0 24px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', padding: '10px 0'}}>
                  <span style={{ fontWeight: '700'}}>Gold League</span>
                  <NavLink to={'/duo/leaderboard'} style={{ fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '13px', color: 'lightblue'}}>
                    View League
                  </NavLink>
                </div>
                <div style={{ display: 'flex', padding: '10px 0 24px 0'}}>
                  <DynamicIcon icon={GiLaurelsTrophy} height={isMobile ? '30px' : '60px'} width={isMobile ? '30px' : '60px'} color={LEAGUE_LEVELS[2].color} padding='0 24px 0 0' />
                  <div style={{ textAlign: 'left', fontSize: '20px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <p style={{ fontWeight: '700', color: 'white'}}>You're ranked #2</p>
                    <p>You've earned 20 XP this week so far</p>
                  </div>
                </div>
              </div>
            </Show>
          </div>
        </div>
  )
}

export default TwoColumnGrid