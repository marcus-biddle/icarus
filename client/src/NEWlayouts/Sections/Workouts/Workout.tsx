import React from 'react'
import TwoColumnGrid from '../../../components/Grid/TwoColumnGrid'
import { DynamicIcon } from '../../../components/Icons/DynamicIcon'
import { GoArrowLeft, GoRepo, GoPackage, GoTrophy, GoCircle, GoCheckCircle  } from "react-icons/go";
import { useNavigate } from 'react-router';
import { useIsMobile } from '../../../utilities/hooks/useIsMobile';
import './index.css'

const USER_DATA2 = [
    { tileID: 1, status: 'completed', locked: true },
    { tileID: 2, status: 'completed', locked: true },
    { tileID: 3, status: 'completed', locked: true },
    { tileID: 4, status: 'completed', locked: true },
    { tileID: 5, status: 'reviewing', locked: false },
    { tileID: 6, status: 'locked', locked: true },
    { tileID: 7, status: 'locked', locked: true },
    { tileID: 8, status: 'locked', locked: true },
    { tileID: 9, status: 'locked', locked: true },
    { tileID: 10, status: 'locked', locked: true },
]

const Workout = () => {
    const navigate = useNavigate();
    const isMobile = useIsMobile({});
  return (
    <TwoColumnGrid showSecondColumnInMobile={false}>
        <div style={{ textAlign: 'left', borderBottom: '2px solid grey', display: 'flex', alignItems: 'center', paddingBottom: '8px', marginBottom: '16px', cursor: 'pointer', justifyContent: 'space-between'}} onClick={() => navigate(-1)}>
            <DynamicIcon icon={GoArrowLeft} height='30px' width='30px' padding='0 10px 0 0' color='grey' />
            <h4 style={{ fontWeight: '700', }}>Section 1: Beginner</h4>
        </div>
        
        <div style={{ backgroundColor: '#24a876', color: 'white', borderRadius: '12px', padding: '20px', textAlign: 'left' }}>
            <div style={{ display: 'flex', position: 'relative'}}>
                <div>
                    <h4 style={{ fontWeight: '700', color: 'white', fontStyle: '', margin: '10px 0' }}>Phase 1</h4>
                    <p style={{ color: 'white', fontSize: '18px', padding: '0' }}>Introduction to each movement.</p>
                </div>
                <div style={{ minHeight: '100%', alignItems: 'center', display: 'flex' }}>
                    <button className='start-btn' style={{ padding: '16px', marginLeft: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'}}>
                        <DynamicIcon icon={GoRepo} height='25px' width='25px' color='#24a876' />
                        Guidebook
                    </button>
                </div>
            </div>
        </div>
        <div className='icon-container'>
            <div style={{ display: 'flex', alignItems:'end', justifyContent: 'space-around', width: '100%', height: '60px'}}>
                {USER_DATA2.slice(0,4).map((tile) => (
                    <button>
                        {tile.locked === false && tile.status === 'reviewing' ? <GoPackage className='tile-icon' /> : tile.status === 'completed' ? <GoCheckCircle className='tile-icon-completed' /> : <GoCircle className='tile-icon-locked'/>}
                    </button>
                    
                ))}
            </div>
            <div style={{ width: '100%', display: 'flex', alignItems:'end', justifyContent: 'right', marginRight: '130px', height: '60px' }}>
                {USER_DATA2.slice(4,5).map((tile) => (
                    <div className={tile.status === 'completed' ? 'tile-completed' : tile.status === 'locked' ? 'tile-icon-locked' : 'tile'}>
                        <button>
                            {tile.locked === false && tile.status === 'reviewing' ? <GoPackage className='tile-icon' /> : tile.status === 'completed' ? <GoCheckCircle className='tile-icon-completed' /> : <GoCircle className='tile-icon-locked'/>}
                        </button>
                    </div>
                ))}
                
                {/* <div className='tile'>
                    <GoPackage className='tile-icon' />
                </div> */}
            </div>
            {/* <div style={{ display: 'flex', alignItems:'end', justifyContent: 'space-around', width: '100%', height: '60px'}}>
                <div className='tile-completed'>
                    <GoCheckCircle className='tile-icon-completed' />
                </div>
                <div className='tile-completed'>
                    <GoCheckCircle className='tile-icon-completed' />
                </div>
                <div className='tile-completed'>
                    <GoCheckCircle className='tile-icon-completed' />
                </div>
                <div className='tile-completed'>
                    <GoCheckCircle className='tile-icon-completed' />
                </div>
            </div> */}
            
            <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems:'end', justifyContent: 'space-around', width: '100%', height: '60px'}}>
                {USER_DATA2.slice(5,9).map((tile) => (
                    <button>
                        {tile.locked === false && tile.status === 'reviewing' ? <GoPackage className='tile-icon' /> : tile.status === 'completed' ? <GoCheckCircle className='tile-icon-completed' /> : <GoCircle className='tile-icon-locked'/>}
                    </button>
                    
                ))}
            </div>
            <div style={{ width: '100%', display: 'flex', alignItems:'end', justifyContent: 'left', marginLeft: '130px', height: '60px' }}>
                {USER_DATA2.slice(9,10).map((tile) => (
                    <button>
                        {tile.locked === false && tile.status === 'reviewing' ? <GoPackage className='tile-icon' /> : tile.status === 'completed' ? <GoCheckCircle className='tile-icon-completed' /> : <GoCircle className='tile-icon-locked'/>}
                    </button>
                    
                ))}
            </div>
            <div>
                CONGRAST
            </div>
            <div>
                <GoCircle className='tile-icon-locked'/>
            </div>
        <div className='tile-locked'>
            <GoPackage className='tile-icon-locked' />
        </div>
        <div className='tile-locked'>
            <GoPackage className='tile-icon-locked' />
        </div>
        <div className='tile-locked'>
            <GoPackage className='tile-icon-locked' />
        </div>
        <div className='tile-locked'>
            <GoPackage className='tile-icon-locked' />
        </div>
        <div className='tile-locked'>
            <GoPackage className='tile-icon-locked' />
        </div>
        <div className='tile-locked'>
            <GoPackage className='tile-icon-locked' />
        </div>
        <div className='tile-locked'>
            <GoPackage className='tile-icon-locked' />
        </div>
        <div className='tile-locked'>
            <GoPackage className='tile-icon-locked' />
        </div>
        <div className='tile-locked'>
            <GoPackage className='tile-icon-locked' />
        </div>
        <div className='tile-locked'>
            <GoPackage className='tile-icon-locked' />
        </div>
        <div className='tile-locked'>
            <GoPackage className='tile-icon-locked' />
        </div>
        </div>
    </TwoColumnGrid>
  )
}

export default Workout