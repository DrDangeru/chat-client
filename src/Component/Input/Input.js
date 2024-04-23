import React from 'react'
import './Input.css';
import InfoBar from '../InfoBar/InfoBar';
import room from '../InfoBar/InfoBar'


const Input = ({ message, setMessage, sendMessage }) => {

  <form className='form'>
    event.preventDefault();
    <input className='input'
      type='text'
      placeholder='Type a message'
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyDown={event => event.key === 'Enter' ? sendMessage(event) : null} />
    <button className='sendButton' onClick={(event) => sendMessage(event)}>Send</button>
  </form>

  return (
    <>
      <InfoBar room={room} />
    </>
  )
}

export default Input