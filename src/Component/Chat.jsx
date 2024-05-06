import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import './Chat.css'; 
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input.js';
import Messages from './Messages/Messages.js';



function Chat() {
  const ENDPOINT = 'http://localhost:5000';
  const socket = io(ENDPOINT); 
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const location = useLocation();


  useEffect(() => {
    console.log('chat started');
    const queryParams = new URLSearchParams(location.search);
    const roomParam = queryParams.get('room');
    const name = queryParams.get('name');
    setRoom(roomParam);
    setName(name);
  
    socket.on('connect', (socket) => {
        console.log('Connected to server');
     
    socket.io.on("error", (error) => {
  console.log(error);
  });
 });
       return () => {
      socket.disconnect();
    };
  }, [location.search]);

 useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const roomParam = queryParams.get('room');
  const name = queryParams.get('name');
  socket.emit('join', { name: name, room: roomParam }, (error) => {
        if (error) console.log(error);
      });
      console.log('Connected to server', name, roomParam);
    },[name,room]);


  useEffect(() => {
 socket.on('message', (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  });
}, []);


const sendMessage = (event) => {
  event.preventDefault();
  console.log('Sending message', message, name, room);
  // let newMessage = `${message.name}: ${message}`;
  setMessages((prevMessages) => [...prevMessages, { user: name, 
    text: message }]);
  console.log('b4 socket emit msg');
  socket.emit('sendMessage', { message, name, room });
  console.log('after socket emit msg');
  setMessage('');

};

  console.log(message, name, 'Msg is saved on tsx client side');
  console.log(messages, name, `these are the msgs/appear 
  correct, except empty/undefined array`);

  return (
    <>
      {room ? (
        <>
          <InfoBar room={room} />
          <div>
            <div className="outerContainer">
              <div className="container">
                <input
                  name='inputt'
                  type="text"
                  maxlength="80"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => (event.key === 'Enter' ?
                    sendMessage(event) : null)}
                    // send message sets the message b4 sending that why it broke
                    
                />
                <button type="submit" onClick={(event) => sendMessage(event)}>
  Send
</button>
              </div>
            
            <div>
           
            <div className='chatMessages'>
                {messages.map((message, idx) => (
                  <div key={idx} style={{ backgroundColor: message.user === name ? '#bdf0f0' : '#e8b3d1', textAlign: message.user === name ? 'left' : 'right' }}>
                             
                    {message.user}: {message.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div> 
        </>
      ) : (
        <div>Error: Room is undefined</div>
      )}
    </>
  );
}

export default Chat;
