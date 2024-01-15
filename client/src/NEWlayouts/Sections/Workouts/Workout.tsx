import React from 'react'
import TwoColumnGrid from '../../../components/Grid/TwoColumnGrid'
import { DynamicIcon } from '../../../components/Icons/DynamicIcon'
import { GoArrowLeft, GoRepo, GoPackage, GoTrophy  } from "react-icons/go";
import { useNavigate } from 'react-router';
import { useIsMobile } from '../../../utilities/hooks/useIsMobile';
import './index.css'

const Workout = () => {
    const navigate = useNavigate();
    const isMobile = useIsMobile({});
  return (
    <TwoColumnGrid>
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
        <div className='tile-completed'>
            <GoTrophy className='tile-icon-completed' />
        </div>
        <div className='tile'>
            <GoPackage className='tile-icon' />
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