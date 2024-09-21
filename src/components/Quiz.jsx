import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import Question from './Question';
import ProgressBar from './ProgressBar';
import { CheckCircleIcon, UserIcon } from '@heroicons/react/24/solid';

const quizData = [
  {
    question: "Affected syn..?",
    options: ["Unaffected", "Falter", "Feigned", "Rich"],
    answer: "Feigned"
  },
  {
    question: "Affluent ant...?",
    options: ["Impoverished", "Improve", "Desire", "Pacify"],
    answer: "Impoverished"
  },
  {
    question: "Affinity syn...?",
    options: ["Kinship", "Boring", "Estrange", "Well-to-do"],
    answer: "Kinship"
  },
  {
    question: "Anarchy syn...?",
    options: ["Likeness", "Absence of government", "Aspiration", "Harmony"],
    answer: "Absence of government"
  },
  {
    question: "Analogy ant...?",
    options: ["Alien", "Enmity", "Tyro", "Flexible"],
    answer: "Alien"
  },
  {
    question: "Amity ant...'?",
    options: ["Enmity", "Enhance", "Harmony", "Correct"],
    answer: "Enmity"
  },
  {
    question: "Amiable syn...?",
    options: ["Estrange", "Rich", "Friendly", "Hostile"],
    answer: "Friendly"
  },
  {
    question: "Amplify syn...?",
    options: ["Improve", "Increase", "Correct", "Aspiration"],
    answer: "Increase"
  },
  {
    question: "Ally syn...?",
    options: ["Associate", "Enhance", "Estrange", "Alloy"],
    answer: "Associate"
  },
  {
    question: "Altitude ant...?",
    options: ["Enhance", "Nadir", "Height", "Hostile"],
    answer: "Nadir"
  },
  {
    question: "Afford syn..?",
    options: ["Capable", "Falter", "Yield", "Albumen"],
    answer: "Capable"
  },
  {
    question: "Alacrity ant...?",
    options: ["Nadir", "Apathy", "Hostile", "Enemy"],
    answer: "Apathy"
  },
  {
    question: "Alluring syn...?",
    options: ["Mitigate", "Temper", "Tempting", "Elevation"],
    answer: "Tempting"
  },
  {
    question: "Amateur syn...?",
    options: ["Novice", "Expert", "Clear", "Separate"],
    answer: "Novice"
  },
  {
    question: "Amazing ant...?",
    options: ["Ordinary", "Temper", "Definite", "strange", ],
    answer: "Ordinary"
  },
  {
    question: "Amalgamate syn...?",
    options: ["Tyro", "Admix", "Desire", "Get better"],
    answer: "Admix"
  },
  {
    question: "Ambition syn...?",
    options: ["Desire", "Admix", "Apathy", "Definite"],
    answer: "Desire"
  },
  {
    question: "Amenable ant...?",
    options: ["Aggravate", "Defiant", "Ruin", "Crabby"],
    answer: "Defiant"
  },
  {
    question: "Altruism syn...?",
    options: ["Nadir", "Apathy", "Benevolence", "Enemy"],
    answer: "Benevolence"
  },
  {
    question: "Amending ant...?",
    options: ["Mitigate", "Temper", "Tempting", "Correct"],
    answer: "Correct"
  }
];


const Quiz = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
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
      setTimeLeft(timeLeft-1);
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
      setTimeLeft(30);
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
