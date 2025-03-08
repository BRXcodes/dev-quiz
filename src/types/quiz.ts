export interface Question {
  id: number;
  category: 'PHP' | 'MySQL';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: number[];
  showResults: boolean;
  hintsRemaining: number;
  showHint: boolean;
}

export interface QuizFilters {
  categories: ('PHP' | 'MySQL')[];
  difficulty: ('Easy' | 'Medium' | 'Hard')[];
} 