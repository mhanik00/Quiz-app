import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon } from '@heroicons/react/24/solid';

const Scores = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
    setScores(savedScores);
  }, []);

  return (
    <motion.div
      className="max-w-xl mx-auto mt-10 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 gradient-text"></h2>
      <ul className='gradient-text '>
        {scores.map((entry, index) => (
          <motion.li
            key={index}
            className="mb-2 flex items-center"
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5 }}
          >
            <UserIcon className="h-6 w-6 text-blue-500 mr-2" />
            <span className="font-bold">{entry.name}</span>: {entry.score}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Scores;
