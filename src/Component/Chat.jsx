import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import './Chat.css'; 
import { socket } from './socket';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input.js';
import Messages from './Messages/Messages.js';

function Chat() {
  const ENDPOINT = 'http://localhost:5000';
  const socket = io(ENDPOINT);
  const [name, setName] = useState(''); // Define room state
  const [room, setRoom] = useState(''); // Define room state
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  // io.on('broadcast', data =>{
  //   alert('this is brdcst', data)
  //  })
  
useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const roomParam = queryParams.get('room');
  const name = queryParams.get('name');
  setRoom(roomParam);
setName(name);
  socket.on('connect', () => {
    console.log('Connected to server');
    socket.emit('join', { name, room: roomParam }, (error) => {
      if (error) console.error(error);
    });
  });

  return () => {
    socket.disconnect();
  };
}, [socket, location, location.search]);

useEffect(() => {
  console.log('Connected to sendMessage effect' );
  socket.on('sendMessage', (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    console.log('setting msg client side in msgs')
  });
}, [message]);

const sendMessage = (event, name) => {
  event.preventDefault();
  if (message) {
    socket.emit('sendMessage', { message: message, user: name, room: room }, () => setMessage(''));
  }
};

console.log(message, name, 'these are the msg ')
console.log(messages, name, 'these are the msgs ')
return (
  <>
    {room ? (
      <>
        <InfoBar room={room} />
        <div>
          <div className="outerContainer">
            <div className="container">
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
              />
              <button type="submit" onClick={sendMessage}>
                Send
              </button>
            </div>
            {/* <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
          </div> 
          {/* <Messages messages={messages} /> */}
           {messages.map((message, idx) => 
           <div key={idx}>
          <div message={message} name={name} />msg here</div>)}
        </div>
      </>
    ) : (
      <div>Error: Room is undefined</div>
    )}
  </>
);
}

export default Chat;
