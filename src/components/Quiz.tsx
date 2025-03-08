'use client';

import { useState, useEffect } from 'react';
import { Question, QuizState, QuizFilters } from '../types/quiz';
import { questions } from '../data/questions';

// Shuffle array function using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Quiz() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    showResults: false,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [filters, setFilters] = useState<QuizFilters>({
    categories: ['PHP', 'MySQL'],
    difficulty: ['Easy', 'Medium', 'Hard'],
  });

  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const filtered = questions.filter(
      (q) =>
        filters.categories.includes(q.category) &&
        filters.difficulty.includes(q.difficulty)
    );
    // Shuffle the filtered questions
    setFilteredQuestions(shuffleArray(filtered));
  }, [filters]);

  const currentQuestion = filteredQuestions[quizState.currentQuestionIndex];

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple answers
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const newAnswers = [...quizState.answers, answerIndex];
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;

    setQuizState({
      ...quizState,
      score: newScore,
      answers: newAnswers,
    });
  };

  const handleNext = () => {
    if (quizState.currentQuestionIndex === filteredQuestions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        showResults: true,
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    // Reshuffle questions when resetting
    setFilteredQuestions(shuffleArray([...filteredQuestions]));
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      showResults: false,
    });
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const toggleCategory = (category: 'PHP' | 'MySQL') => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    setFilters((prev) => ({
      ...prev,
      difficulty: prev.difficulty.includes(difficulty)
        ? prev.difficulty.filter((d) => d !== difficulty)
        : [...prev.difficulty, difficulty],
    }));
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-[60vh] p-8 animate-fadeIn">
        <div className="max-w-2xl mx-auto glass-morphism rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Select Your Challenge</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">Customize your quiz experience by selecting categories and difficulty levels.</p>
          <div className="space-y-8">
            <div className="animate-slideIn" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Categories:</h3>
              <div className="flex flex-wrap gap-3">
                {['PHP', 'MySQL'].map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category as 'PHP' | 'MySQL')}
                    className={`px-6 py-3 rounded-xl text-lg font-medium transform transition-all duration-200 hover:scale-105 ${
                      filters.categories.includes(category as 'PHP' | 'MySQL')
                        ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="animate-slideIn" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Difficulty:</h3>
              <div className="flex flex-wrap gap-3">
                {['Easy', 'Medium', 'Hard'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => toggleDifficulty(diff as 'Easy' | 'Medium' | 'Hard')}
                    className={`px-6 py-3 rounded-xl text-lg font-medium transform transition-all duration-200 hover:scale-105 ${
                      filters.difficulty.includes(diff as 'Easy' | 'Medium' | 'Hard')
                        ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizState.showResults) {
    return (
      <div className="min-h-[60vh] p-8 animate-fadeIn">
        <div className="max-w-2xl mx-auto glass-morphism rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Quiz Complete! 🎉</h2>
            <div className="mb-8">
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {((quizState.score / filteredQuestions.length) * 100).toFixed(0)}%
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                You scored {quizState.score} out of {filteredQuestions.length}
              </p>
              <div className="w-full h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 transition-all duration-1000 ease-out"
                  style={{
                    width: `${(quizState.score / filteredQuestions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white text-lg font-medium rounded-xl
                shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] p-8 animate-fadeIn">
      <div className="max-w-3xl mx-auto glass-morphism rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
            Question {quizState.currentQuestionIndex + 1} of {filteredQuestions.length}
          </span>
          <span className="text-lg font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
            Score: {quizState.score}
          </span>
        </div>
        <div className="mb-8 animate-slideIn">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 font-medium">
              {currentQuestion.category}
            </span>
            <span className={`px-4 py-2 rounded-lg font-medium ${
              currentQuestion.difficulty === 'Easy'
                ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'
                : currentQuestion.difficulty === 'Medium'
                ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300'
                : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'
            }`}>
              {currentQuestion.difficulty}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{currentQuestion.question}</h2>
          {currentQuestion.code && (
            <pre className="bg-gray-900 text-white dark:bg-gray-950 dark:text-gray-100 p-6 rounded-xl mb-6 overflow-x-auto text-lg shadow-inner">
              <code>{currentQuestion.code}</code>
            </pre>
          )}
        </div>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            let buttonStyle = "w-full text-left p-5 rounded-xl quiz-option ";
            
            if (selectedAnswer === null) {
              buttonStyle += "border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300";
            } else if (index === currentQuestion.correctAnswer) {
              buttonStyle += "border-2 border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 cursor-default";
            } else if (index === selectedAnswer) {
              buttonStyle += "border-2 border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 cursor-default";
            } else {
              buttonStyle += "border-2 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-default";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={buttonStyle}
              >
                <div className="flex items-center justify-between relative z-10">
                  <span className="flex-1">{option}</span>
                  {selectedAnswer !== null && index === currentQuestion.correctAnswer && (
                    <span className="text-green-600 dark:text-green-400 text-xl ml-4">✓</span>
                  )}
                  {selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <span className="text-red-600 dark:text-red-400 text-xl ml-4">✗</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {showExplanation && (
          <div className={`mt-6 p-6 rounded-xl shadow-inner animate-fadeIn ${
            selectedAnswer === currentQuestion.correctAnswer 
              ? "bg-green-50 dark:bg-green-900/30 border-2 border-green-100 dark:border-green-800" 
              : "bg-red-50 dark:bg-red-900/30 border-2 border-red-100 dark:border-red-800"
          }`}>
            <p className={`text-lg ${
              selectedAnswer === currentQuestion.correctAnswer 
                ? "text-green-800 dark:text-green-300" 
                : "text-red-800 dark:text-red-300"
            }`}>
              <span className="font-semibold">
                {selectedAnswer === currentQuestion.correctAnswer 
                  ? "Correct! " 
                  : "Incorrect. "}
              </span>
              {currentQuestion.explanation}
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white text-lg font-medium rounded-xl
                  shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
              >
                {quizState.currentQuestionIndex === filteredQuestions.length - 1 ? 'Show Results' : 'Next Question'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 