import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import './Chat.css'; 
import InfoBar from './InfoBar/InfoBar';
// import Input from './Input/Input.js';
// import Messages from './Messages/Messages.js';
import Image from './Image/image.js'
// import { render } from '@testing-library/react';


function Chat() {
  const ENDPOINT = 'http://localhost:5000';
  const socket = io(ENDPOINT); 
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const [file, setFile] = useState();

  useEffect(() => {
    console.log('chat started');
    const queryParams = new URLSearchParams(location.search);
    const roomParam = queryParams.get('room');
    const name = queryParams.get('name');
    setRoom(roomParam);
    setName(name);
    
    socket.on('connect', () => { // (socket)
        console.log('Connected to server');
    socket.io.on("error", (error) => {
  console.log(error);
  });
 });
    //    return () => {
    //   socket.disconnect();
    // }; dont think its needed and may cause unexpc behavior
  }, []);//location.search, socket

 useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const roomParam = queryParams.get('room');
  const name = queryParams.get('name');
  socket.emit('join', { name: name, room: roomParam }, (error) => {
        if (error) console.log(error);
      });
      console.log('Connected to server', name, roomParam);
    },[name, room]);

  useEffect(() => {
    socket.on('message', (message) => {
      console.log('Incoming message in client:', message);
      setMessages((prevMessages) => [...prevMessages, { 
        room: message.room,
        user: message.user,
        text: message.text,
        type : 'file' | null,
        body : message.body | null,
        mimeType : message.type | null,
        fileName : message.name | null,
      }]);
    });
    // renderMessage(messages);
  }, []);// event listener so no retrigger needed

  // Connecting user needs to have the messages copied and set as his msgs
  // these are in the messages array
const sendMessage = (event) => {
  event.preventDefault();
  let messageObj = {};
  if (!file) {
     messageObj = {
      name: name,
      message: message,
      room: room, 
    };
    setMessage('');
    
  } else {
   messageObj = {
    name: name,
    room : room,
    message: message,
    type: 'file' , // type : type in server
    body: file,
    mimeType: file.type,
    fileName: file.name,
    };
    setFile('');
    setMessage('');
  }

  document.getElementById("fileInput").value = "";
  socket.emit('message', messageObj, () => {
    console.log('Message sent:', messageObj);
  });
};

const selectFile = (event) => {
  const selectedFile = event.target.files[0];
  // setMessage(selectedFile.name);
  setFile(selectedFile);
}

function renderMessage (message, index) {
  {console.log('message in render', message)}
  if ( message.body != 0 && message.type ==='file' ) { 
    const blob = new Blob([message.body], { type: message.mimeType });
    return (
      <div key={index} style={{ backgroundColor: message.user === name ? '#bdf0f0' : '#e8b3d1', textAlign: message.user === name ? 'left' : 'right' }}>
        <Image fileName={message.fileName} blob={blob} />
      </div>
    );
  } else if (message.text) { // Check if message.text exists
    return (
      <div key={index} style={{ backgroundColor: message.user === name ? '#bdf0f0' : '#e8b3d1', textAlign: message.user === name ? 'left' : 'right' }}>
        {message.user}: {message.text}
      </div>
    );
  } 
   else {
     return null; // Return null if neither file nor text message is present
   }
}
 
  console.log(message);
  console.log(messages, `these are the msgs/appear 
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
                  maxLength="50"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => (event.key === 'Enter' ?
                    sendMessage(event) : null)}
                />
                         <div className='side'>
                <button type="submit" onClick={(event) => sendMessage(event)}>
                  Send
              </button>
                 <input id='fileInput' type="file" onChange={selectFile} /> 
               </div> 
              </div>

            <div>
              <div className='chatMessages'>
               {messages.map((message, idx) => renderMessage(message, idx))}
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
