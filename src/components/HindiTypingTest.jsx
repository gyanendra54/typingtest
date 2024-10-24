// src/components/HindiTypingTest.jsx
import React, { useState, useEffect } from 'react';

const HindiTypingTest = ({ setResult }) => {
  const sampleTexts = [
    "काला घोड़ा तेजी से दौड़ता है।",
    "एक हजार मील की यात्रा एक कदम से शुरू होती है।",
    "सभी चमकने वाली चीजें सोना नहीं होती।",
    "क्रिया शब्दों से अधिक जोर से बोलती है।",
    "अच्छा समय हमेशा लंबा नहीं रहता।"
  ];

  const [inputText, setInputText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0); // Initialize to 0
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [currentSampleText, setCurrentSampleText] = useState(sampleTexts[0]);

  // Randomly pick a new sample text for each test
  useEffect(() => {
    setCurrentSampleText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  }, []);

  useEffect(() => {
    if (inputText === currentSampleText) {
      const endTime = new Date().getTime();
      setIsTestComplete(true);
      setResult(((currentSampleText.split(' ').length / (timeTaken / 60)).toFixed(2)));
    }
  }, [inputText, currentSampleText, timeTaken, setResult]);

  // Use interval to calculate real-time elapsed while typing
  useEffect(() => {
    let interval = null;
    if (startTime && !isTestComplete) {
      interval = setInterval(() => {
        const currentTime = new Date().getTime();
        setTimeTaken((currentTime - startTime) / 1000); // Update the time in seconds
      }, 100); // Update every 100ms for smoother display
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [startTime, isTestComplete]);

  const handleInputChange = (e) => {
    if (!startTime) {
      setStartTime(new Date().getTime());
    }
    setInputText(e.target.value);
    calculateAccuracy(e.target.value);
  };

  const calculateAccuracy = (typedText) => {
    const totalChars = typedText.length;
    let correctChars = 0;

    // Count correct characters
    for (let i = 0; i < totalChars; i++) {
      if (typedText[i] === currentSampleText[i]) {
        correctChars++;
      }
    }

    // Calculate accuracy
    const accuracyPercentage = (correctChars / totalChars) * 100;
    setAccuracy(accuracyPercentage.toFixed(2));
  };

  const handleRestart = () => {
    setInputText('');
    setIsTestComplete(false);
    setStartTime(null);
    setTimeTaken(0); // Reset time
    setAccuracy(0);
    setCurrentSampleText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  };

  const renderColoredText = () => {
    return currentSampleText.split('').map((char, index) => {
      let color = '';
      if (inputText[index] === char) {
        color = 'green'; // Correct letter
      } else if (inputText[index] !== undefined) {
        color = 'red'; // Incorrect letter
      }
      return (
        <span key={index} style={{ color }}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="typing-test">
      <h2>Hindi Typing Test</h2>
      <p>{renderColoredText()}</p>
      {!isTestComplete ? (
        <>
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="यहां टाइप करना शुरू करें..."
            rows="4"
            cols="50"
            disabled={isTestComplete}
          />
          <p>Time: {timeTaken ? `${timeTaken.toFixed(2)} seconds` : 'Start typing to track time!'}</p>
          <p>Accuracy: {accuracy}%</p>
        </>
      ) : (
        <>
          <p>Test complete! Time taken: {timeTaken.toFixed(2)} seconds</p>
          <p>Accuracy: {accuracy}%</p>
          <button onClick={handleRestart}>Restart Test</button>
        </>
      )}
    </div>
  );
};

export default HindiTypingTest;

