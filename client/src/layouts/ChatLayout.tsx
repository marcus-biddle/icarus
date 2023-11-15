import React, { useState, useEffect } from 'react';
import Pusher, { Channel } from 'pusher-js';
import { createAxiosInstance } from "../api/config/axios";
import { googleId } from '../helpers/data';
import './ChatLayout.css'

export const ChatLayout: React.FC = () => {
  const [ messages, setMessages ] = useState<{ username: '', message: ''}[]>([]);
  const [ message, setMessage ] = useState('');

  console.log(messages);

  const axiosInstance = createAxiosInstance();

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('f8dcf3aa8d196d37cba1', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      console.log('Recieved data:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await axiosInstance.post('/messages', {
      content: message,
      googleId: googleId
    })

    setMessage('');
  }

  return (
    <div style={{ padding: ' 032px', alignItems: 'center', alignContent: 'center', display: 'flex', flexDirection: 'column'}}>
      <div>
        {messages.map((message) => {
          return (
            <div>
              <div>
                {message.username}
              </div>
              <div>{message.message}</div>
            </div>
          )
        })}
      </div>
      <form onSubmit={submit} style={{ display: 'flex', width: '100%', boxSizing: 'border-box', justifyContent: 'space-between', maxWidth: '700px'}}>
        <div className='input-group'>
          <input
          required
          type='text'
          id='message'
          value={message} 
          onChange={(e) => setMessage(e.target.value)}/>
          <label htmlFor='message'>Message</label>
        </div>
        <button style={{ width: '60px', fontSize: '1.25rem'}}>Send</button>
      </form>
    </div>
  );
};
