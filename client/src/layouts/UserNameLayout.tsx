import React from 'react'
import { Form, redirect, useActionData } from 'react-router-dom';
import { userActions } from '../api/users';

export const UserNameLayout = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = useActionData();

    return (
        <div>
            <h1>Looks like this is your first time signing in.</h1>
            <p>Enter a username to begin.</p>
            <Form method="post" action='/create' >
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
    )
}

export const usernameAction = async ({ request }) => {
    const data = await request.formData();

    const submission = {
        username: data.get('username')
    }

    const pattern = /^[a-zA-Z0-9_]+$/;

    if (!pattern.test(submission.username)) {
        return { error: 'Username can only contain letters, numbers, and underscores.'}
    } else {
        try {
            const res = await userActions.createUser(submission.username);
            console.log(res);
        } catch (err) {
            console.log('Could not create user.')
        }
        
    }
    
    return redirect('/home')
  };