'use client';

import { useState, useEffect } from 'react';
import { Question, QuizState, QuizFilters } from '../types/quiz';
import { questions } from '../data/questions';
import QuizMenu from './QuizMenu';

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
    hintsRemaining: 3,
    showHint: false,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [filters, setFilters] = useState<QuizFilters>({
    categories: [],
    difficulty: []
  });
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<{ text: string; originalIndex: number }[]>([]);

  const handleStartQuiz = (selectedFilters: QuizFilters) => {
    setFilters(selectedFilters);
    setIsQuizStarted(true);
    
    // Reset quiz state
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      showResults: false,
      hintsRemaining: 3,
      showHint: false,
    });
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  useEffect(() => {
    if (isQuizStarted) {
      // First filter by category and difficulty
      const filtered = questions.filter(
        (q) =>
          filters.categories.includes(q.category) &&
          filters.difficulty.includes(q.difficulty)
      );

      // Log for debugging
      console.log('Selected filters:', filters);
      console.log('Filtered questions:', filtered.map(q => ({ id: q.id, category: q.category, difficulty: q.difficulty })));

      // Ensure we have enough questions of each difficulty
      const byDifficulty = filters.difficulty.reduce((acc, diff) => {
        const questionsOfDifficulty = filtered.filter(q => q.difficulty === diff);
        const shuffled = shuffleArray(questionsOfDifficulty);
        acc[diff] = shuffled.slice(0, Math.ceil(10 / filters.difficulty.length));
        return acc;
      }, {} as Record<string, Question[]>);

      // Combine questions from each difficulty
      const combined = Object.values(byDifficulty).flat();
      const shuffled = shuffleArray(combined);
      setFilteredQuestions(shuffled.slice(0, 10));
    }
  }, [filters, isQuizStarted]);

  const currentQuestion = filteredQuestions[quizState.currentQuestionIndex];

  // Shuffle options when question changes
  useEffect(() => {
    if (currentQuestion) {
      const optionsWithIndices = currentQuestion.options.map((text, index) => ({
        text,
        originalIndex: index,
      }));
      setShuffledOptions(shuffleArray(optionsWithIndices));
    }
  }, [currentQuestion]);

  const handleAnswer = (shuffledIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple answers
    const originalIndex = shuffledOptions[shuffledIndex].originalIndex;
    setSelectedAnswer(originalIndex);
    setShowExplanation(true);

    const isCorrect = originalIndex === currentQuestion.correctAnswer;
    const newAnswers = [...quizState.answers, originalIndex];
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;

    setQuizState({
      ...quizState,
      score: newScore,
      answers: newAnswers,
    });
  };

  const handleHint = () => {
    if (quizState.hintsRemaining > 0 && !showExplanation) {
      setQuizState(prev => ({
        ...prev,
        hintsRemaining: prev.hintsRemaining - 1,
        showHint: true
      }));
    }
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
        showHint: false,
      }));
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setIsQuizStarted(false);
    setFilters({
      categories: [],
      difficulty: []
    });
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      showResults: false,
      hintsRemaining: 3,
      showHint: false,
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

  if (!isQuizStarted) {
    return <QuizMenu onStartQuiz={handleStartQuiz} />;
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-[60vh] p-8 animate-fadeIn">
        <div className="max-w-2xl mx-auto glass-morphism rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">No Questions Available</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            No questions match your selected filters. Please try different options.
          </p>
          <button
            onClick={resetQuiz}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white text-lg font-medium rounded-xl
              shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  if (quizState.showResults) {
    const percentage = ((quizState.score / 10) * 100);
    let grade = 'F';
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';

    return (
      <div className="min-h-[60vh] p-8 animate-fadeIn">
        <div className="max-w-2xl mx-auto glass-morphism rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Quiz Complete! 🎉</h2>
            <div className="mb-8">
              <div className="text-6xl font-bold mb-4 animate-bounce" style={{ color: grade === 'A' ? '#22c55e' : grade === 'B' ? '#3b82f6' : grade === 'C' ? '#eab308' : grade === 'D' ? '#f97316' : '#ef4444' }}>
                Grade: {grade}
              </div>
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {percentage.toFixed(0)}%
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                You scored {quizState.score} out of 10
              </p>
              <div className="w-full h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 transition-all duration-1000 ease-out"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
            <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white text-lg font-medium rounded-xl
                shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
            >
              Try Another Quiz
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
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
              Score: {quizState.score}
            </span>
            <span className="text-lg font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-lg">
              Hints: {quizState.hintsRemaining}
            </span>
          </div>
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
          {shuffledOptions.map((option, shuffledIndex) => {
            let buttonStyle = "w-full text-left p-5 rounded-xl quiz-option ";
            
            if (selectedAnswer === null) {
              buttonStyle += "border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300";
            } else if (option.originalIndex === currentQuestion.correctAnswer) {
              buttonStyle += "border-2 border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 cursor-default";
            } else if (option.originalIndex === selectedAnswer) {
              buttonStyle += "border-2 border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 cursor-default";
            } else {
              buttonStyle += "border-2 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-default";
            }

            return (
              <button
                key={shuffledIndex}
                onClick={() => handleAnswer(shuffledIndex)}
                disabled={selectedAnswer !== null}
                className={buttonStyle}
              >
                <div className="flex items-center justify-between relative z-10">
                  <span className="flex-1">{option.text}</span>
                  {selectedAnswer !== null && option.originalIndex === currentQuestion.correctAnswer && (
                    <span className="text-green-600 dark:text-green-400 text-xl ml-4">✓</span>
                  )}
                  {selectedAnswer === option.originalIndex && option.originalIndex !== currentQuestion.correctAnswer && (
                    <span className="text-red-600 dark:text-red-400 text-xl ml-4">✗</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {!selectedAnswer && !quizState.showHint && quizState.hintsRemaining > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleHint}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-lg font-medium rounded-xl
                shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
            >
              Use Hint ({quizState.hintsRemaining} remaining)
            </button>
          </div>
        )}
        {quizState.showHint && (
          <div className="mt-6 p-6 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border-2 border-emerald-100 dark:border-emerald-800 animate-fadeIn">
            <p className="text-lg text-emerald-800 dark:text-emerald-300">
              <span className="font-semibold">Hint: </span>
              {currentQuestion.hint}
            </p>
          </div>
        )}
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