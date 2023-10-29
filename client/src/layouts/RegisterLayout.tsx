import React from 'react'
import { Form, redirect, useActionData } from 'react-router-dom';
import { userActions } from '../api/users';
import { GoogleAuth } from '../components/GoogleLogin/GoogleLogin';

export const RegisterLayout = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = useActionData();

    return (
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', minHeight: '95vh', alignItems: 'center'}}>
            <div style={{ backgroundColor: '#23272e', color: '#FFFFFF', position: 'relative', padding: '0 56px', maxWidth: '400px', borderRadius: '24px', minHeight: '50vh'}}>
                <h1 style={{ paddingBottom: '32px'}}><span style={{ color: 'gold'}}>Let's F* Go!</span> Registration</h1>
                <p style={{ paddingBottom: '56px'}}>This is your first time here. Create a username to finish registration.</p>
                <Form method="post" action='/create' style={{ display: 'flex', flexDirection: 'column', gap: '40px'}}>
                    <input
                    type="text"
                    name="username"
                    placeholder="Enter a username"
                    required
                    />
                    <button type="submit">Submit</button>
                </Form>
                {data !== undefined && <div>{data.error}</div>}
            </div>
        </div>
        
    )
}

export const usernameAction = async ({ request }) => {
    const data = await request.formData();

    const submission = {
        username: data.get('username')
    }

    const pattern = /^[a-zA-Z0-9_]+$/;

    // if (!pattern.test(submission.username)) {
    //     return { error: 'Username can only contain letters, numbers, and underscores.'}
    // } else {
    //     try {
    //         const res = await userActions.createUser(submission.username);
    //         console.log('usernameAction res createUser', res);
    //     } catch (err) {
    //         console.log('Could not create user.')
    //     }
        
    // }
    
    return redirect('/home');
  };