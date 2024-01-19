import React, { useState } from 'react'
import { GiGorilla, GiLaurelCrown, GiLibertyWing } from "react-icons/gi";
import { DynamicIcon } from '../../components/Icons/DynamicIcon';
import './Login.css'
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import { useGoogleAuth } from '../../utilities/hooks/useGoogleAuth';
import { Show } from '../../helpers/functional';
import { useDelayedDisplay } from '../../utilities/hooks/useDelayedDisplay';
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { useNavigate } from 'react-router';

const NewLogin = () => {
    const [ position, nextPosition ] = useState(0);
    const [ isVisible, setIsVisibile ] = useState(true);
    const [ selectedItems, setSelectedItems ] = useState<string[]>([]);
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isMobile = useIsMobile({});
    const navigate = useNavigate();
    const { handleSignin } = useGoogleAuth();
    const DelayedDisplay = useDelayedDisplay({ delay: 5000 });

    const handlePositionChange = () => {
        setIsVisibile(false);
        setTimeout(() => {
            nextPosition(position + 1);
            setIsVisibile(true);
          }, 1000);
    };

    const handleCheckboxChange = (item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleUsernameChange = (event) => {
        const newUsername = event.target.value;
        setUsername(newUsername);
    
        // Check for special characters in the username
        const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharacters.test(newUsername)) {
          setErrorMessage('Username cannot contain special characters.');
        } else {
          setErrorMessage('');
        }
      };

      const handleCreateAccount = () => {
        handleSignin();
        // add logic for the other data
        navigate('/duo/leaderboard')
      }

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
        <div style={{ padding: isMobile ? '32px' : '32px 240px'}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1DB954'}}>
                <DynamicIcon icon={GiGorilla} width='40px' height='40px' color='white' />
                <h2 style={{ margin: '0', color: 'inherit', fontWeight: '700', letterSpacing: '1.12px', fontSize: isMobile ? '46px' : '48px'}}>FitWars</h2>
            </div>
        </div>
        <Show when={position === 0}>
            <div style={{ maxHeight: '80%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' }} className={`fade-in-out ${isVisible ? 'visible' : 'hidden'}`}>
                <div style={{ position: 'relative', width: '500px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
                    <div className='tile' style={{ }}>
                        <div className='fly'>
                            <GiLibertyWing className='tile-icon-flipped' />
                            <GiLaurelCrown className='tile-icon-center' />
                            <GiLibertyWing className='tile-icon-nonFlipped' />
                        </div>
                    </div>
                </div>
                <div style={{ maxWidth: '500px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
                    <h1 style={{ margin: '0', fontWeight: '700', letterSpacing: '.85px'}}>Compete against yourself and friends in workouts!</h1>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '200px'}}>
                        <div style={{ height: '50px'}}>
                            <button className='login-btn' style={{ backgroundColor: '#1DB954', width: '100%' }} onClick={() => handlePositionChange()}>Get Started</button>
                        </div>
                        <button className='login-btn' style={{ backgroundColor: 'white', color: '#525967' }} onClick={() => handleSignin()}>I already have an account</button>
                    </div>
                </div>
            </div>
        </Show>
        <Show when={position === 1}>
            <div style={{ color: 'white'}} className={`fade-in-out ${isVisible ? 'visible' : 'hidden'}`}>
                <h2 style={{ padding: isMobile ? '0 24px' : ''}}>Welcome to the group! Please select as many exercises as you would like to participate in.</h2>
                <DelayedDisplay>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: '32px', marginTop: '80px'}}>
                        <div className='container' style={{ minWidth: isMobile ? '80%' : '150px', height: isMobile ? '120px' : '100px', cursor: 'pointer'}} onClick={() => handleCheckboxChange('pushups')}>
                            <div style={{ textAlign: 'right', padding: '4px'}}>
                                {selectedItems.includes('pushups') ? <DynamicIcon icon={MdOutlineCheckBox} width={isMobile ? '35px' : '25px'} height={isMobile ? '35px' : '25px'} /> : <DynamicIcon icon={MdOutlineCheckBoxOutlineBlank} width={isMobile ? '35px' : '25px'} height={isMobile ? '35px' : '25px'} />}
                            </div>
                            <h4 style={{ fontSize: isMobile ? '28px' : ''}}>Push-ups</h4>
                        </div>
                        <div className='container' style={{ minWidth: isMobile ? '80%' : '150px', height: isMobile ? '120px' : '100px', cursor: 'pointer'}} onClick={() => handleCheckboxChange('pullups')}>
                            <div style={{ textAlign: 'right', padding: '4px'}}>
                                {selectedItems.includes('pullups') ? <DynamicIcon icon={MdOutlineCheckBox} width={isMobile ? '35px' : '25px'} height={isMobile ? '35px' : '25px'} /> : <DynamicIcon icon={MdOutlineCheckBoxOutlineBlank} width={isMobile ? '35px' : '25px'} height={isMobile ? '35px' : '25px'} />}
                            </div>
                            <h4 style={{ fontSize: isMobile ? '28px' : ''}}>Pull-ups</h4>
                        </div>
                        <div className='container' style={{ minWidth: isMobile ? '80%' : '150px', height: isMobile ? '120px' : '100px', cursor: 'pointer'}} onClick={() => handleCheckboxChange('running')}>
                            <div style={{ textAlign: 'right', padding: '4px'}}>
                                {selectedItems.includes('running') ? <DynamicIcon icon={MdOutlineCheckBox} width={isMobile ? '35px' : '25px'} height={isMobile ? '35px' : '25px'} /> : <DynamicIcon icon={MdOutlineCheckBoxOutlineBlank} width={isMobile ? '35px' : '25px'} height={isMobile ? '35px' : '25px'} />}
                            </div>
                            <h4 style={{ fontSize: isMobile ? '28px' : ''}}>Running</h4>
                        </div>
                    </div>
                </DelayedDisplay>
                <Show when={selectedItems.length >= 1}>
                    <div style={{ textAlign: 'right', margin: '64px'}}>
                        <button className='login-btn' onClick={() => handlePositionChange()}>Next</button>
                    </div>
                </Show>
            </div>
        </Show>
        <Show when={position === 2}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h2 style={{ padding: isMobile ? '0 24px' : ''}}>Last step! What should everyone call you?</h2>
                <form onSubmit={() => null} className='form-container' style={{ display: isMobile ? '' : 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <div className='input-group-signin' style={{ width: isMobile? '350px' : '700px' }}>
                    <input
                    required
                    type='text'
                    id='message'
                    value={username} 
                    style={{ width: '100%', margin: '80px 32px'}}
                    onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor='message' style={{ top: '6.2rem', left: '3rem' }}>Username</label>
                    </div>
                    
                    <button className='login-btn' style={{ backgroundColor: '#1DB954', width: '100%' }} onClick={() => handleSignin()}>Create Account</button>
                </form>
            </div>
        </Show>
    </div>
  )
}

export default NewLogin