import { useState } from 'react';
import { QuizFilters } from '../types/quiz';

interface QuizMenuProps {
  onStartQuiz: (filters: QuizFilters) => void;
}

export default function QuizMenu({ onStartQuiz }: QuizMenuProps) {
  const [filters, setFilters] = useState<QuizFilters>({
    categories: [],
    difficulty: []
  });

  const [isShuffleCategories, setIsShuffleCategories] = useState(false);
  const [isShuffleDifficulty, setIsShuffleDifficulty] = useState(false);

  const handleCategoryToggle = (category: 'PHP' | 'MySQL' | 'JavaScript' | 'Python' | 'React') => {
    if (isShuffleCategories) return; // Don't allow manual selection in shuffle mode
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleDifficultyToggle = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    if (isShuffleDifficulty) return; // Don't allow manual selection in shuffle mode
    setFilters(prev => ({
      ...prev,
      difficulty: prev.difficulty.includes(difficulty)
        ? prev.difficulty.filter(d => d !== difficulty)
        : [...prev.difficulty, difficulty]
    }));
  };

  const handleShuffleCategoriesToggle = () => {
    setIsShuffleCategories(!isShuffleCategories);
    if (!isShuffleCategories) {
      // When enabling shuffle, select all categories
      setFilters(prev => ({
        ...prev,
        categories: ['PHP', 'MySQL', 'JavaScript', 'Python', 'React']
      }));
    }
  };

  const handleShuffleDifficultyToggle = () => {
    setIsShuffleDifficulty(!isShuffleDifficulty);
    if (!isShuffleDifficulty) {
      // When enabling shuffle, select all difficulties
      setFilters(prev => ({
        ...prev,
        difficulty: ['Easy', 'Medium', 'Hard']
      }));
    }
  };

  const handleStartQuiz = () => {
    // Validate that at least one category and difficulty are selected
    if (filters.categories.length === 0 || filters.difficulty.length === 0) {
      alert('Please select at least one category and difficulty level');
      return;
    }
    onStartQuiz(filters);
  };

  return (
    <div className="min-h-[60vh] p-8 animate-fadeIn">
      <div className="max-w-2xl mx-auto glass-morphism rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Configure Your Quiz</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Customize your quiz experience by selecting categories and difficulty levels.
        </p>
        
        <div className="space-y-8">
          <div className="animate-slideIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Categories:</h3>
              <button
                onClick={handleShuffleCategoriesToggle}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isShuffleCategories
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {isShuffleCategories ? 'Random Categories' : 'Choose Categories'}
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {['PHP', 'MySQL', 'JavaScript', 'Python', 'React'].map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category as 'PHP' | 'MySQL' | 'JavaScript' | 'Python' | 'React')}
                  disabled={isShuffleCategories}
                  className={`px-6 py-3 rounded-xl text-lg font-medium transform transition-all duration-200 hover:scale-105 ${
                    filters.categories.includes(category as 'PHP' | 'MySQL' | 'JavaScript' | 'Python' | 'React')
                      ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  } ${isShuffleCategories ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="animate-slideIn" style={{ animationDelay: '0.4s' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Difficulty:</h3>
              <button
                onClick={handleShuffleDifficultyToggle}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isShuffleDifficulty
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {isShuffleDifficulty ? 'Random Difficulty' : 'Choose Difficulty'}
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => handleDifficultyToggle(diff as 'Easy' | 'Medium' | 'Hard')}
                  disabled={isShuffleDifficulty}
                  className={`px-6 py-3 rounded-xl text-lg font-medium transform transition-all duration-200 hover:scale-105 ${
                    filters.difficulty.includes(diff as 'Easy' | 'Medium' | 'Hard')
                      ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  } ${isShuffleDifficulty ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center animate-slideIn" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={handleStartQuiz}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 
                text-white text-xl font-medium rounded-xl shadow-lg hover:shadow-xl 
                transform transition-all duration-200 hover:scale-105"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 