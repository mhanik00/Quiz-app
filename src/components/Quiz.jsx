import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import Question from './Question';
import ProgressBar from './ProgressBar';
import { CheckCircleIcon, UserIcon } from '@heroicons/react/24/solid';

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Who is the CEO of Tesla?",
    options: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Tony Stark"],
    answer: "Elon Musk"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter"
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "NaCl"],
    answer: "H2O"
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
    answer: "Harper Lee"
  },
  {
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    answer: "300,000 km/s"
  },
  {
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
    answer: "Hydrogen"
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
    answer: "Mount Everest"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "What is the orange part of an egg called?",
    options: ["Yolk", "White", "Shell", "Albumen"],
    answer: "Yolk"
  },
  {
    question: "How many legs do insects have?",
    options: ["4", "6", "8", "10"],
    answer: "6"
  },
  {
    question: "What is a baby kangaroo called?",
    options: ["Joey", "Cub", "Calf", "Pup"],
    answer: "Joey"
  },
  {
    question: "What is the closest planet to the Sun?",
    options: ["Venus", "Earth", "Mars", "Mercury"],
    answer: "Mercury"
  },
  {
    question: "In which country can you find the Eiffel Tower?",
    options: ["Italy", "France", "Germany", "Spain"],
    answer: "France"
  },
  {
    question: "How many days are there in a year?",
    options: ["364", "365", "366", "367"],
    answer: "365"
  },
  {
    question: "How many players are in a soccer team?",
    options: ["9", "10", "11", "12"],
    answer: "11"
  },
  {
    question: "Where do polar bears live?",
    options: ["Antarctica", "Arctic", "Africa", "Australia"],
    answer: "Arctic"
  },
  {
    question: "Which is faster, light or sound?",
    options: ["Light", "Sound"],
    answer: "Light"
  },
  {
    question: "How many letters are in the English alphabet?",
    options: ["24", "25", "26", "27"],
    answer: "26"
  }
];


const Quiz = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isCorrect, setIsCorrect] = useState(true);
  const [name, setName] = useState('');
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    if (savedName) {
      setName(savedName);
      setIsNameSubmitted(true);
    }
  }, []);

  useEffect(() => {
    if (isNameSubmitted) {
      localStorage.setItem('name', name);
    }
  }, [name, isNameSubmitted]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswer(null);
    }
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    const correctAnswer = quizData[currentQuestion].answer;
    const isAnswerCorrect = option === correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(10);
    } else {
      setShowScore(true);
      saveScore();
    }
  };

  const saveScore = () => {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ name, score });
    localStorage.setItem('scores', JSON.stringify(scores));
    onQuizComplete();
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setIsNameSubmitted(true);
  };

  useEffect(() => {
    anime({
      targets: '.gradient-text',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo'
    });
  }, []);

  return (
    <motion.div
      className="glass max-w-xl mx-auto mt-10 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {!isNameSubmitted ? (
        <form onSubmit={handleNameSubmit} className="text-center">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Enter Your Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded mb-4 w-full"
            required
          />
          <motion.button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Start Quiz
          </motion.button>
        </form>
      ) : showScore ? (
        <div className="p-4 border rounded shadow-md text-center">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gradient-text">
            <CheckCircleIcon className="h-8 w-8 text-green-500 mr-2" />
            Your Score
          </h2>
          <p className="text-2xl">{score}/{quizData.length}</p>
        </div>
      ) : (
        <div>
          <ProgressBar score={score} totalQuestions={quizData.length} isCorrect={isCorrect} />
          <div className="mb-4 text-right text-red-500">Time Left: {timeLeft}s</div>
          <Question
            question={quizData[currentQuestion].question}
            options={quizData[currentQuestion].options}
            handleAnswer={handleAnswer}
          />
        </div>
      )}
    </motion.div>
  );
};

export default Quiz;
