import React from 'react';
import { motion } from 'framer-motion';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

const Question = ({ question, options, handleAnswer }) => {
  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-2 flex items-center gradient-text">
        <QuestionMarkCircleIcon className="h-6 w-6 text-blue-500 mr-2" />
        {question}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleAnswer(option)}
            className="bg-gray-200 p-2 rounded hover:bg-gray-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Question;
