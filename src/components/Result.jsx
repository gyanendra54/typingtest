// src/components/Result.jsx
import React from 'react';

const Result = ({ result }) => {
  return (
    <div className="result">
      <h2>Your Results</h2>
      {result ? (
        <p>Your typing speed is: {result} WPM (Words Per Minute)</p>
      ) : (
        <p>Complete the test to see your result!</p>
      )}
    </div>
  );
};

export default Result;
