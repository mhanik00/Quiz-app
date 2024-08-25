import React from 'react';

const ProgressBar = ({ score, totalQuestions, isCorrect }) => {
  const progress = (score / totalQuestions) * 100;
  const progressColor = isCorrect ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div
        className={`${progressColor} h-4 rounded-full transition-all duration-500`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
