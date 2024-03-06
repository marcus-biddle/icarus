import React, { useState, useEffect, useRef, useCallback } from 'react';
import Pusher from 'pusher-js';
import './ChatLayout.css'
import { useLoaderData } from 'react-router-dom';
import { messageActions } from '../../api/messages';
import { CiPaperplane } from "react-icons/ci";
import { formatDateString, formatTimestamp, get0100Timestamp } from '../../helpers/date';
import { Show } from '../../helpers/functional';
import { getInitials } from '../../helpers/text';
import { useAuthCheck } from '../../utilities/hooks/useAuthCheck';

export const ChatLayout = () => {
  const data: any = useLoaderData();
  const [ messages, setMessages ] = useState<{ username: '', message: '', timestamp: ''}[]>(data.messages);
  const [ message, setMessage ] = useState('');

  const pusher = new Pusher('f8dcf3aa8d196d37cba1', {
    cluster: 'us2'
  });

  const channel = pusher.subscribe('chat');

  useEffect(() => {
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

  const submit = useCallback(async (e) => {
    e.preventDefault();

    await messageActions.addMessage(message);

    setMessage('');
  }, [message]) 

  return (
    <div className='chat-container'>
      <div className='scroll-container' ref={scrollContainerRef}>
        {messages.map((message, index) => {
          return (
            <div key={index} style={{ width: '95%'}}>
              <Show when={message.username !== data.user.username}>
                <div style={{ textAlign: 'left', padding: '8px 0'}}>
                  <p style={{ textAlign: 'right'}}>{formatDateString(message.timestamp)}</p>
                  <div style={{ textAlign: 'left', width: '100%' }}>
                    <div style={{ display: 'flex', textAlign: 'left', justifyContent: 'left', alignItems: 'center'}}>
                      <p style={{ marginRight: '10px', border: '2px solid #eb498f', borderRadius: '50%', padding: '6px', backgroundColor: 'transparent', color: 'white' }}>{getInitials(message.username)}</p>
                      <p style={{ wordWrap: 'break-word', color: 'white', width: '100%', padding: '8px', borderRadius: '8px', backgroundColor: '#1E293B', fontSize: '14px' }}>{message.message}</p>  
                    </div>
                  </div>
                </div>
              </Show>
              <Show when={message.username === data.user.username}>
                <div style={{ textAlign: 'left', padding: '8px 0'}}>
                  <p>{formatDateString(message.timestamp)}</p>
                  <div style={{ textAlign: 'right', width: '100%' }}>
                      <div style={{ display: 'flex', textAlign: 'right', justifyContent: 'right', alignItems: 'center'}}>
                        <p style={{ wordWrap: 'break-word', color: 'white', width: '100%', padding: '8px', borderRadius: '8px', backgroundColor: '#1E293B', fontSize: '14px' }}>{message.message}</p>
                        <p style={{ marginLeft: '10px', border: '2px solid #eb498f', borderRadius: '50%', padding: '6px', backgroundColor: 'transparent', color: 'white' }}>{getInitials(message.username)}</p>
                      </div>
                  </div>
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
          <label htmlFor='message'> Send Message</label>
          <button className='send-btn'>
            <CiPaperplane className='send-icon'/>
          </button>
        </div>
        
      </form>
    </div>
  );
};
