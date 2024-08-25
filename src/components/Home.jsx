import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Quiz from './Quiz';
import Scores from './Scores';
import { HomeIcon } from '@heroicons/react/24/solid';

const Home = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizComplete = () => {
    setShowQuiz(false);
    localStorage.removeItem('name');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {showQuiz ? (
        <Quiz onQuizComplete={handleQuizComplete} />
      ) : (
        <motion.div
          className="glass max-w-xl mx-auto mt-10 p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gradient-text">
            <HomeIcon className="h-8 w-8 text-blue-500 mr-2" />
            Competitors' Scores
          </h2>
          <Scores />
          <motion.button
            onClick={() => setShowQuiz(true)}
            className="bg-blue-500 text-white p-2 rounded mt-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Start New Quiz
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
