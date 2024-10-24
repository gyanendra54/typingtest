// src/components/Header.jsx
import React from 'react';
import TypingTestLogo from '../assets/typing.avif'; // Make sure the image path is correct
import './Header.css'; // Import the CSS specific to the header

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        
      </div>
      <div className="title-container">
        <h1 className='mainheader'>Typing Test</h1>
      </div>
    </header>
  );
};

export default Header;
