import React from 'react';

const Question = ({ question, options, handleAnswer }) => {
  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl text-slate-100 font-bold mb-4">{question}</h2>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(option)}
          className="block w-full p-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Question;
