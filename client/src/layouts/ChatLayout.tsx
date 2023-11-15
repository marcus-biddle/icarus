import React, { useState } from 'react';
import { usePusher } from '../utilities/hooks/usePusher';

export const ChatLayout: React.FC = () => {
  const { send: sendMessage} = usePusher({
    // fill this in
    channelName: 'cha',
    eventName: 'client-test',
    callback: (data) => {
      // Handle incoming messages
      console.log('Received message:', data.message);
      // You can update your local state or any other logic here
    },
    pusherKey: 'your-pusher-key',
    pusherOptions: {
      cluster: 'your-cluster',
    },
    onInitialMessages: (initialMessages) => {
      // Handle initial messages
      console.log('Initial messages:', initialMessages);
      // You can update your local state or any other logic here
    },
  });

  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        <strong>Chat Room</strong>
      </div>
      <div>
        {/* Render your chat messages here */}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};
