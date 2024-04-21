import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import './Chat.css'; 
import InfoBar from './InfoBar/InfoBar';
 

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
    const socket = io(ENDPOINT);
    const queryParams = new URLSearchParams(location.search);
    const roomParam = queryParams.get('room');
    const name = queryParams.get('name');
    setRoom(roomParam); // Set room state
    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('join', { name, room: roomParam }, (error) => {
        if (error) console.error(error);
      });
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, [ENDPOINT,location, location.search]);

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log('setting msg client side in msgs')
    });
    return () => socket.disconnect();
  }, [ENDPOINT ]);

  const sendMessage = (event, name) => {
    const socket = io(ENDPOINT);
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', 
      {message: message, user: name, room:room}, () => setMessage(''));
    }
  };

  console.log(message,messages,' these are the msgs ')

  return (
    <>
      {room ? (
        <>
          <InfoBar room={room} />
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
          </div>
        </>
      ) : (
        <div>Error: Room is undefined</div>
      )}
    </>
  );
}

export default Chat;
