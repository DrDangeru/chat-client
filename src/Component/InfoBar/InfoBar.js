import React from 'react'
import './InfoBar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';


function InfoBar(room) {
  return (
    <div className='infoBar'>InfoBar
      <div className='leftInnerContainer'>
        <img className='onlineIcon' src={onlineIcon} />
        <h3>{room.toString()}</h3>
      </div>
      <div className='rightInnerContainer'>
        <a href='/'><img src={closeIcon} alt='close image' />
        </a>
      </div>
    </div>
  )
}

export default InfoBar
