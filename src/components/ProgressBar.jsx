import React from 'react';
import { motion } from 'framer-motion';
import { ChartBarIcon } from '@heroicons/react/24/solid';

const ProgressBar = ({ score, totalQuestions, isCorrect }) => {
  const progress = (score / totalQuestions) * 100;

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="gradient-text text-sm font-medium text-blue-700 flex items-center">
          <ChartBarIcon className="  h-6 w-6 text-blue-500 mr-2" />
          Progress
        </span>
        <span className="gradient-text text-sm font-medium text-blue-700">{score}/{totalQuestions}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          className={`h-2.5 rounded-full ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default ProgressBar;
