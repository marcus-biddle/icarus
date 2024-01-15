import React from 'react'
import StatsBar from '../../../components/StatsBar/StatsBar';
import { useIsMobile } from '../../../utilities/hooks/useIsMobile';
import { GoArrowLeft, GoBroadcast } from "react-icons/go";
import { DynamicIcon } from '../../../components/Icons/DynamicIcon';
import { useNavigate } from 'react-router';
import TwoColumnGrid from '../../../components/Grid/TwoColumnGrid';

const Details = () => {
    const isMobile = useIsMobile({});
    const navigate = useNavigate();
    return (
        <TwoColumnGrid>
            <div style={{ textAlign: 'left', borderBottom: '2px solid grey', display: 'flex', alignItems: 'center', paddingBottom: '8px', marginBottom: '16px', cursor: 'pointer'}} onClick={() => navigate(-1)}>
                <DynamicIcon icon={GoArrowLeft} height='20px' width='20px' padding='0 10px 0 0' color='grey' />
                <h4 style={{ fontWeight: '700', }}>Sections</h4>
            </div>
            <div style={{ backgroundColor: '#24a876', color: 'white', borderRadius: '12px', padding: '40px'}}>
                <h6 style={{ fontSize: '13px', backgroundColor: isMobile ? '' : '#2ccd8fac', display: 'inline-block', margin: '0', borderRadius: '4px', padding: '2px 4px', textAlign: 'center'}}>CLTH A1</h6>
                <h4 style={{ fontWeight: '700', color: 'white', fontStyle: '', margin: '10px 0'}}>Section 1: Beginner</h4>
                <p style={{ color: 'white', fontSize: '18px', padding: '0 16px'}}>Start with the basic movements and adapt to the volume</p>
            </div>
            <div style={{ textAlign: 'left'}}>
                <div style={{ display: 'flex', marginTop: '24px', alignItems: 'center'}}>
                    <DynamicIcon icon={GoBroadcast} width='30px' height='30px' color='aqua' />
                    <h3 style={{ padding: '6px 0 0 16px', fontWeight: '700', color: 'black'}}>CLTH A1</h3>
                </div>
                <p style={{ fontSize: '18px' }}>This section covers the <strong>very early A1</strong> level of calisthenics. There are many ways to improve, this site is just one of those ways.</p>
                <p style={{ fontSize: '18px', paddingTop: '8px' }}>At this level, someone could perform:</p>
                <ul style={{ fontSize: '18px', margin: '8px 40px' }}>
                    <li>10 Burpees</li>
                    <li>20 Pushups</li>
                    <li>30 squats</li>
                    <li>50 Sit ups</li>
                </ul>
            </div>
        </TwoColumnGrid>
      )
}

export default Details