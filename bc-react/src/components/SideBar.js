import React, { Component } from 'react';

class SideBar extends Component {

  render() {
    return (
      <div className='sidebar'>
        {/* sidebar is a flex item of the parent */}
        <div className='nested'>
        {/* nesting is the nested flex box */}
        <a className="item wobble" href="/profile2"> <img src='../Images/user.png' alt='profile'/>
          <div className='caption'>profile</div>
        </a>
        <a className="item wobble" href="/home">
          <img src='../Images/calendar.png' alt='calendar'/>
          <div className='caption'>calendar</div>
        </a>
        <a className="item wobble" href="/places"><img src='../Images/places.png' alt='places'/>
          <div className='caption'>places</div>
        </a>
        <a className="item wobble" href="/photos"><img src='../Images/camera.png' alt='photos'/>
          <div className='caption'>photos</div>
        </a>
        <a className="item wobble" href="/"><img src='../Images/logout.png' alt='log out'/>
          <div className='caption'>log out</div>
        </a>
        </div>
      </div>
    );
  }
}

export default SideBar