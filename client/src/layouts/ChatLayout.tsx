import React, { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import './ChatLayout.css'
import { useLoaderData } from 'react-router-dom';
import { messageActions } from '../api/messages';
import { CiPaperplane } from "react-icons/ci";
import { formatTimestamp } from '../helpers/date';
import { Show } from '../helpers/functional';

export const ChatLayout = () => {
  const data: any = useLoaderData();
  const [ messages, setMessages ] = useState<{ username: '', message: '', timestamp: ''}[]>(data.messages);
  const [ message, setMessage ] = useState('');

  useEffect(() => {
    const pusher = new Pusher('f8dcf3aa8d196d37cba1', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: { message: '', username: '', timestamp: '' }) => {
      console.log('Recieved data:', data);
      if (!messages.some((msg) => msg.timestamp === data.timestamp)) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      channel.unbind_all(); // Unbind all event listeners
      channel.unsubscribe(); // Unsubscribe from the channel
    };
    
  }, [messages]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      // Set the scrollTop to the maximum scroll height
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    }
  }, [messages]);

  const submit = async (e) => {
    e.preventDefault();

    await messageActions.addMessage(message);

    setMessage('');
  }

  return (
    <div className='chat-container'>
      <div className='scroll-container' ref={scrollContainerRef}>
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <Show when={message.username !== data.user.username}>
                <div style={{ textAlign: 'left', width: '100%', padding: '12px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px'}}>
                    <p style={{ fontSize: '16px', color: '#2196f3', paddingBottom: '16px'}}>{message.username}</p>
                    <p style={{ fontSize: '10px', color: 'grey', }}>{formatTimestamp(message.timestamp)}</p>
                  </div>
                  <p style={{ padding: '0 32px', minWidth: '90%', fontSize: '1.25rem'}}>{message.message}</p>
              </div>
              </Show>
              <Show when={message.username === data.user.username}>
              <div style={{ textAlign: 'right', width: '100%', padding: '12px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', justifyContent: 'right'}}>
                  <p style={{ fontSize: '10px', color: 'grey', }}>{formatTimestamp(message.timestamp)}</p>
                  <p style={{ fontSize: '16px', color: '#2196f3', paddingBottom: '16px', paddingRight: '16px'}}>You</p>
                  </div>
                  <p style={{ padding: '0 32px', minWidth: '90%', fontSize: '1.25rem'}}>{message.message}</p>
              </div>
              </Show>
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
