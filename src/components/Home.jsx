import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';

const Home = () => {
  const [scores, setScores] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
    setScores(savedScores);
  }, []);

  const handleQuizComplete = () => {
    const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
    setScores(savedScores);
    setShowQuiz(false);
    localStorage.removeItem('name');
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center">
      {showQuiz ? (
        <Quiz onQuizComplete={handleQuizComplete} />
      ) : (
        <div className="glass max-w-xl mx-auto mt-10 p-6 text-center">
          <h2 className="text-2xl text-lime-400 font-bold mb-4">Competitors' Scores</h2>
          <ul>
            {scores.map((entry, index) => (
              <li key={index} className="mb-2 font-bold text-slate-100">
                <span className="font-bold text-slate-100">{entry.name}</span>: {entry.score}
              </li>
            ))}
           
           

          </ul>
          <button
            onClick={() => setShowQuiz(true)}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Start New Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
