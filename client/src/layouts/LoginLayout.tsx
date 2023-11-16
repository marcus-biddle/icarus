import React, { useEffect } from 'react';
import { GoogleAuth } from '../components/GoogleLogin/GoogleLogin';
import { redirect, useLoaderData, useNavigate } from 'react-router';
import { Show, isUserLoggedIn } from '../helpers/functional';

export const LoginLayout = () => {
    const navigate = useNavigate();

    const data = localStorage.getItem('idToken');
    console.log('useEff login', data)
    // useEffect(() => {
    //     if (data) {
    //         console.log('useEff login', data)
    //         navigate('/home');
    //     }
    // }, [])

    return (
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', minHeight: '95vh', alignItems: 'center', }}>
            <div style={{ backgroundColor: '#23272e', color: '#FFFFFF', position: 'relative', padding: '0 56px', maxWidth: '400px', borderRadius: '24px', minHeight: '50vh', boxShadow: '0 0 5px rgba(0, 0, 0, 0.25)'}}>
                <h1 style={{ paddingBottom: '32px', color: 'gold'}}>Let's F* Go!</h1>
                <p style={{ paddingBottom: '56px'}}>Sign in with your google account to join the competition.</p>
                <Show when={!isUserLoggedIn()}>
                    <GoogleAuth />
                </Show>
            </div>
        </div>
        
    )
}