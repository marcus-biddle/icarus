import React from 'react'
import { useIsMobile } from '../../utilities/hooks/useIsMobile'
import StatsBar from '../../components/StatsBar/StatsBar';
import { GoRuby, GoShieldLock, GoTrophy, GoIssueDraft } from "react-icons/go";
import { DynamicIcon } from '../../components/Icons/DynamicIcon';
import './index.css';

const LEAGUE_LEVELS = [
    { name: 'Bronze', unlocked: true, color: 'bronze' },
    { name: 'Silver', unlocked: true, color: 'grey' },
    { name: 'Gold', unlocked: true, color: 'gold' },
    { name: 'Platinum', unlocked: false, color: 'blue' },
    { name: 'Diamond', unlocked: false, color: 'aqua' },
    { name: 'Master', unlocked: false, color: 'red' },
    { name: 'Grandmaster', unlocked: false, color: 'black' },
]

const FAKE_USERS = [
    { name: 'Marcus', exp: '254' },
    { name: 'Anna', exp: '120' },
    { name: 'John', exp: '300' },
    { name: 'Emily', exp: '75' },
    { name: 'David', exp: '200' },
    { name: 'Sophie', exp: '150' },
    { name: 'Michael', exp: '180' },
    { name: 'Emma', exp: '90' },
    { name: 'Benjamin', exp: '280' },
    { name: 'Olivia', exp: '110' },
    { name: 'Jacob', exp: '220' },
    { name: 'Ava', exp: '160' },
    { name: 'William', exp: '130' },
    { name: 'Isabella', exp: '240' },
    // Add more entries as needed
  ];

const Leaderboard = () => {
    const isMobile = useIsMobile({});
    return (
        <div className={"two-column-container"}>
          <div className="left-column" style={{ padding: isMobile ? '0' : '20px', minHeight: isMobile ? '80vh' : '',}}>
            {/* Content for the left column */}
            <div style={{ display: 'flex', justifyContent: isMobile ? 'space-around' : 'center', width: isMobile ? '100vw' : '', alignItems: 'center' }}>
                {LEAGUE_LEVELS.map((level) => (
                    level.name === 'Gold' ? <DynamicIcon icon={level.unlocked ? GoRuby : GoShieldLock} height={isMobile ? '60px' : '90px'} width={isMobile ? '60px' : '90px'} color={level.unlocked ? level.color : 'grey'} padding={isMobile ? '' : '0 16px'} /> : <DynamicIcon icon={level.unlocked ? GoRuby : GoShieldLock} height={isMobile ? '30px' : '50px'} width={isMobile ? '30px' : '50px'} color={level.unlocked ? level.color : 'grey'} padding={isMobile ? '' : '0 16px'} />
                ))}
            </div>
            <div>
                <h4 style={{ fontWeight: '700', color: 'black', margin: '24px 0 16px 0'}}>Gold League</h4>
                <h6 style={{ margin: '0', color: 'grey', fontWeight: '400'}}>Top 10 advance to the next league</h6>
                <p style={{ fontSize: '14px', color: 'gold', fontWeight: '700', letterSpacing: '1.12px'}}>2 days</p>
            </div>
            <div style={{ textAlign: 'center', borderTop: '1px solid grey', maxHeight: '70.5vh', overflowX: 'auto'}}>
                {FAKE_USERS.map((user, index) => (
                    <div className='user-card'>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px'}}>
                            <span>{index +1}</span>
                            <span>
                                <DynamicIcon icon={GoIssueDraft} height='50px' width='50px' />
                            </span>
                            <span>
                                <p style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '1.12px'}}>{user.name}</p>
                            </span>
                        </div>
                        <div>
                            <p style={{ fontSize: '16px', fontWeight: '300', letterSpacing: '1.12px'}}>{user.exp} XP</p>
                        </div>
                        
                    </div>
                ))}
            </div>
            
          </div>
          {!isMobile && <div className="right-column">
            {/* Content for the right column */}
            <StatsBar />
          </div>}
        </div>
      )
}

export default Leaderboard