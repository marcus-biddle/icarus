import React, { useEffect, useState } from 'react'
import { useIsMobile } from '../../utilities/hooks/useIsMobile'
import { GoRuby, GoShieldLock, GoTrophy, GoIssueDraft } from "react-icons/go";
import { DynamicIcon } from '../../components/Icons/DynamicIcon';
import { GiShield } from "react-icons/gi";
import { GiLaurelsTrophy } from "react-icons/gi";
import TwoColumnGrid from '../../components/Grid/TwoColumnGrid';
import { NavLink } from 'react-router-dom';
import { daysLeftInMonth, isInCurrentMonth } from '../../helpers/date';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../../features/user/userSlice';
// import { LeaderboardState } from '../../features/leaderboard/leaderboardSlice'
import { RootState } from '../../app/store';
import { findUserById } from '../../helpers/data';
import { leaderboardActions } from '../../api/leaderboard';

export const LEAGUE_LEVELS = [
    { name: 'bronze', color: '#cd7f32', description: 'Top 10 players advance.' }, // Bronze
    { name: 'silver', color: '#c0c0c0', description: 'Top 10 players advance.' }, // Silver
    { name: 'gold', color: '#ffd700', description: 'Top 10 players advance. Must have be participating in all events.' }, // Gold
    { name: 'platinum', color: '#e5e4e2', description: 'Top 5 players advance. Lose points if your streak ends.' }, // Platinum
    { name: 'diamond', color: '#b9f2ff', description: 'Top 5 players advance. Lose points if your streak ends.' }, // Diamond
    { name: 'master', color: '#ff4500', description: 'Top player advances. Have the highest points in every category.' }, // Master (Red)
    { name: 'grandmaster', color: '#9370db', description: 'Congrats! You beat everyone!' }, // Grandmaster (Black)
  ];

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

  // when someone creates an account, add them to the leaderboard.

const Leaderboard = () => {
    // should move leaderboard to router dom loader
    const userLeagueId = useSelector((state: RootState) => state.user.currentUser?.leaderboardHistory.find(history => {
        if (isInCurrentMonth(history.date)) {
            return history
        }
    }))
    const index = LEAGUE_LEVELS.findIndex(level => level.name === (userLeagueId?.leagueId || 'bronze'))
    const [ activeTrophy, setActiveTrophy ] = useState(LEAGUE_LEVELS[index]);

    // const leagueIndex: number = useSelector((state: RootState) => state.leaderboard.currentLeaderboard?.leagueGroups.findIndex(group => group.leagueId === activeTrophy.name)) || 0
    // const league = useSelector((state: RootState) => state.leaderboard.currentLeaderboard?.leagueGroups[leagueIndex])
    const isMobile = useIsMobile({});
    const dispatch = useDispatch();
    // const leaderboard = useSelector((state: RootState) => state.leaderboard.currentLeaderboard);
    const monthlyXp = useSelector((state: RootState) => state.user.currentUser?.monthlyXp);
    const userId = useSelector((state: RootState) => state.user.currentUser?.id)
    // const userInLeaderboard = leaderboard && findUserById(leaderboard, userId);

    const [leaderboard, setLeaderboard] = useState<any>(null);
    

   const handeRefreshClick = () => {
        // dispatch(
        //     updateLeaderboardRank()
        // )
   };
   

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // const data: any = await leaderboardActions.updateLeaderboardRank();
    //             // setLeaderboard(data.updatedLeaderboard.leagueGroups[leagueIndex]);
    //             // console.log('test', data.updatedLeaderboard.leagueGroups[leagueIndex])
    //             // create a dispatch to find current user and update their leaderboard placement in redux
    //         } catch (error) {
    //             console.error('Error fetching leaderboard:', error);
    //         }
    //     };

    //     fetchData();
    // }, [l])

    return (
        <TwoColumnGrid showSecondColumnInMobile={false}>
            <div style={{ display: 'flex', justifyContent: isMobile ? 'space-around' : 'center', width: isMobile ? '100vw' : '', alignItems: 'center', marginTop: isMobile ? '32px' : '' }}>
                {LEAGUE_LEVELS.map((trophy) => {
                    return (
                        <div key={trophy.name} onClick={() => setActiveTrophy(trophy)} style={{ cursor: 'pointer'}}>
                            <DynamicIcon icon={GiLaurelsTrophy} height={isMobile ? ( activeTrophy && trophy.name === activeTrophy.name) ? '70px' : '50px' : ( activeTrophy && trophy.name === activeTrophy.name) ? '90px' : '60px'} width={isMobile ? ( activeTrophy && trophy.name === activeTrophy.name) ? '70px' : '50px' : ( activeTrophy && trophy.name === activeTrophy.name) ? '90px' : '60px'} color={trophy.color} padding={isMobile ? '' : '0 16px'} />
                        </div>
                        
                    )
                })}
            </div>
            <div style={{ marginBottom: '24px'}}>
                <h4 style={{ fontWeight: '700', color: activeTrophy.color, margin: '24px 0 16px 0', transition: 'all .3s ease', fontSize: isMobile ? '24px' : '' }}>{activeTrophy.name} League</h4>
                <h6 style={{ margin: '0', color: 'grey', fontWeight: '400', transition: 'all .3s ease', fontSize: isMobile ? '16px' : '', padding: isMobile ? '0 10px 16px' : '' }}>{activeTrophy.description}</h6>
                <p style={{ color: 'white', fontWeight: '700', letterSpacing: '1.12px', transition: 'all .3s ease', fontSize: isMobile ? '18px' : '14px' }}>{daysLeftInMonth()} days</p>
            </div>
            <div style={{ textAlign: 'left' }}>
                <button style={{ textTransform: 'uppercase', backgroundColor: 'transparent', letterSpacing: '1.12px', color: 'lightcyan', fontWeight: '700'}} onClick={() => handeRefreshClick()}>Refresh</button>
            </div>
            <div style={{ textAlign: 'right' }}>
                <button style={{ textTransform: 'uppercase', backgroundColor: 'transparent', letterSpacing: '1.12px', color: 'lightcyan', fontWeight: '700'}}>View Details</button>
            </div>
            <div className='container' style={{ textAlign: 'center', maxHeight: isMobile ? '57vh' : '70.5vh', overflowX: 'auto' }}>
                {leaderboard && leaderboard.users.map((user) => (
                    <NavLink key={user.userId} to={''} className='user-card'>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px'}}>
                            <span>{user.ranking}</span>
                            <span>
                                <DynamicIcon icon={GoIssueDraft} height='50px' width='50px' />
                            </span>
                            <span>
                                <p style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '1.12px', color: 'white'}}>{user.name}</p>
                            </span>
                        </div>
                        <div>
                            <p style={{ fontSize: '16px', fontWeight: '300', letterSpacing: '1.12px', color: 'white'}}>{user.xp} XP</p>
                        </div>
                    </NavLink>
                ))}
            </div>
        </TwoColumnGrid>
      )
}

export default Leaderboard