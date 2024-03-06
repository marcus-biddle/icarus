// import { useEffect, useState } from 'react';
// import Pusher, { Channel } from 'pusher-js';

// interface PusherOptions {
//   cluster: string;
//   encrypted?: boolean;
// }

// interface UsePusherOptions {
//   channelName: string;
//   eventName: string;
//   callback: (data: any) => void;
//   pusherKey: string;
//   pusherOptions: PusherOptions;
//   onInitialMessages?: (messages: any[]) => void;
// }

// export const usePusher = ({
//   channelName,
//   eventName,
//   callback,
//   pusherKey,
//   pusherOptions,
//   onInitialMessages
// }: UsePusherOptions): { send: (message: string) => void } => {
//   const [channel, setChannel] = useState<Channel | null>(null);

//   const connectToPusher = () => {
//     const newPusher = new Pusher(pusherKey, pusherOptions);
//     Pusher.logToConsole = true;
//     const newChannel = newPusher.subscribe(channelName);

//     newChannel.bind('pusher:subscription_succeeded', () => {
//       if (onInitialMessages) {
//         fetch('http://localhost:3001/api/messages')
//           .then((response) => response.json())
//           .then((messages) => onInitialMessages(messages))
//           .catch((error) => console.error('Error fetching initial messages:', error));
//       }
//     });

//     newChannel.bind(eventName, callback); // Bind the callback for the specified event
//     setChannel(newChannel);

//     return newChannel;
//   };

//   const sendMessage = (message: string) => {
//     if (!channel) {
//       // If channel is not initialized, connect to Pusher
//       const newChannel = connectToPusher();

//       // Delay sending the message until the channel is successfully subscribed
//       newChannel.bind('pusher:subscription_succeeded', () => {
//         newChannel.trigger(eventName, { message });
//       });
//     } else {
//       // Send the message on the existing channel
//       channel.trigger(eventName, { message });
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (channel) {
//         channel.unbind_all(); // Unbind all event listeners
//         channel.unsubscribe(); // Unsubscribe from the channel
//       }
//     };
//   }, [channel]);

//   return { send: sendMessage };
// };

