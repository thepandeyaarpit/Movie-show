import React from 'react';
import './Header.css';
const Header = () => {
  return (
    <>
      {/* <span onClick={() => window.scroll(0, 0)} className='header'>🎥  Review.ME🎥 </span> */}
      <span onClick={() => window.scroll(0, 0)} className='header'> Review.ME </span>
      {/* <div className='main'>
        <div className='mainone'>
          Review.me
        </div>
        <div className='maintwo'>
          login
        </div>
      </div> */}
    </>
  )
}

export default Header;