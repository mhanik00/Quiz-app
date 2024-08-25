import React, { useEffect, useState } from 'react';

const Scores = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
    setScores(savedScores);
  }, []);

  return (
    <div className="glass max-w-xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">Competitors' Scores</h2>
      <ul>
        {scores.map((entry, index) => (
          <li key={index} className="mb-2">
            <span className="font-bold">{entry.name}</span>: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scores;
