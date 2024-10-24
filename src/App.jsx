// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import EnglishTypingTest from './components/EnglishTypingTest';
import HindiTypingTest from './components/HindiTypingTest';
import Result from './components/Result';
import Header from './components/Header'; // Import the Header component
import './styles.css';

function App() {
  const [result, setResult] = useState(null);
  const [key, setKey] = useState(0); // Track key for forcing re-render
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the new path
    setKey(prevKey => prevKey + 1); // Force re-render by changing the key
  };

  return (
    <div className="app">
      <Header /> {/* Add the Header component */}
      <nav>
        <button onClick={() => handleNavigation('/')}>English Typing Test</button>
        <button onClick={() => handleNavigation('/hindi')}>Hindi Typing Test</button>
      </nav>
      {/* Add a key to force re-render when it changes */}
      <Routes key={key}>
        <Route path="/" element={<EnglishTypingTest setResult={setResult} />} />
        <Route path="/hindi" element={<HindiTypingTest setResult={setResult} />} />
      </Routes>
      <Result result={result} />
    </div>
  );
}

export default App;


