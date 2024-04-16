import React, { useEffect, useState } from 'react';
import { useLocation , location } from 'react-router-dom';
import queryString from 'query-string';
import { io } from "socket.io-client";
import './Chat.css';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';


let socket;

function Chat({ room, name }) {
  // const [name, setName] = useState('');
  // const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:5000'; //specify http/https
  const location = useLocation();

  useEffect(() => {
  
    console.log('First use effect in chat.jsx')
    socket = io(ENDPOINT);
    const queryParams = new URLSearchParams(location.search);
        console.log(location,' this is location')
    const room = queryParams.get('room');
    const name = queryParams.get('name');
    console.log('Parsed Query String:', name, room); // Log parsed query parameters WE HAVE them here... and avail no need for setname & room

    socket.on('connect', () =>{

    console.log('You connected '  )

    console.log(location,' this is location')
    
    socket.emit('join', name, room ,error => { // removed error
      console.log("Final Room on emit", room);
      if (error) {
        console.error(error); // Handle error
      }
    })})

    return () => {
      socket.disconnect();
      // socket.off();
    }
  }, [ENDPOINT, location.search, location]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

 
  return (
    <>
      <InfoBar room={room} /> {/* Convert room object to string */}
      <div className='outerContainer'>
        <div className='container'>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
      </div>
    </>
  )
}

export default Chat;
