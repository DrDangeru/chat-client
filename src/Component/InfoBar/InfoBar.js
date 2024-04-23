import React from 'react'
import './InfoBar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';
// import * as {room,name} from 'Join.js';

function InfoBar(room) {
  return (
    < div className='infoBar' > InfoBar
      < div className='leftInnerContainer' >
        <img className='onlineIcon' src={onlineIcon} />
        <h3>Welcome to {room.room}</h3>
      </div >
      <div className='rightInnerContainer'>
        <a href='/'><img src={closeIcon} alt='close image' />
          {/* full page refresh ^ Exits room/resets name */}
        </a>
      </div>
    </div >
  )
}

export default InfoBar
