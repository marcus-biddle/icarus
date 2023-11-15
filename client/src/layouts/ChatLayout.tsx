import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import { createAxiosInstance } from "../api/config/axios";
import { googleId } from '../helpers/data';
import './ChatLayout.css'
import { useLoaderData } from 'react-router-dom';
import { messageActions } from '../api/messages';
import { CiPaperplane } from "react-icons/ci";

export const ChatLayout = () => {
  const data: { username: '', message: ''}[] | any = useLoaderData();
  const [ messages, setMessages ] = useState<{ username: '', message: '', timestamp: ''}[]>(data.messages);
  const [ message, setMessage ] = useState('');

  console.log(messages);

  useEffect(() => {
    const pusher = new Pusher('f8dcf3aa8d196d37cba1', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: { message: '', username: '', timestamp: '' }) => {
      console.log('Recieved data:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await messageActions.addMessage(message);

    setMessage('');
  }

  return (
    <div style={{ padding: ' 032px', alignItems: 'center', alignContent: 'center', display: 'flex', flexDirection: 'column'}}>
      <div>
        {messages.map((message, index) => {
          return (
            <div style={{ display: 'flex'}} key={index}>
              <div>
                {message.username}
                {message.timestamp}
              </div>
              <div>{message.message}</div>
              {/* <div>{message.timestamp}</div> */}
            </div>
          )
        })}
      </div>
      <form onSubmit={submit} className='form-container'>
        <div className='input-group'>
          <input
          required
          type='text'
          id='message'
          value={message} 
          onChange={(e) => setMessage(e.target.value)}/>
          <label htmlFor='message'>Message</label>
          <button className='send-btn'>
            <CiPaperplane className='send-icon'/>
          </button>
        </div>
        
      </form>
    </div>
  );
};
