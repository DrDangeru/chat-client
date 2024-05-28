import React from 'react'
import './InfoBar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';


function InfoBar({ room, name }) {
  return (
    <>
      <h2 className='headin'>Welcome to {room},{name}!</h2>
      < div className='infoBar' >


        < div className='leftInnerContainer' >
          <div>
            <img className='onlineIcon' src={onlineIcon} />
            <img className='onlineIcon' src={onlineIcon} />
            <img className='onlineIcon' src={onlineIcon} />
            <img className='onlineIcon' src={onlineIcon} />
            <img className='onlineIcon' src={onlineIcon} />
            <div>Online</div>
          </div>
        </div >

        <a className='rightInnerContainer' href='/'><img src={closeIcon} alt='close image' />
          <div>Exit Room</div>
          {/* full page refresh ^ Exits room/resets name */}
        </a>
      </div>
    </>
  )
}

export default InfoBar
