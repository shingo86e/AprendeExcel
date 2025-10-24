// Tipos de preguntas disponibles
export type QuestionType = 'multiple-choice' | 'fill-in-blank' | 'drag-drop' | 'true-false';

// Niveles de dificultad
export type QuizLevel = 'basico' | 'intermedio' | 'avanzado';

// Opción para preguntas de múltiple choice
export interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

// Item para preguntas de arrastrar y soltar
export interface DragDropItem {
  id: string;
  content: string;
  correctZone: string;
}

// Zona de destino para drag & drop
export interface DropZone {
  id: string;
  label: string;
  acceptsItems: string[]; // IDs de items que acepta
}

// Pregunta base
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  level: QuizLevel;
  question: string;
  explanation?: string;
  points: number;
}

// Pregunta de múltiple choice
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: MultipleChoiceOption[];
}

// Pregunta de completar
export interface FillInBlankQuestion extends BaseQuestion {
  type: 'fill-in-blank';
  correctAnswers: string[]; // Múltiples respuestas correctas posibles
  caseSensitive?: boolean;
}

// Pregunta de arrastrar y soltar
export interface DragDropQuestion extends BaseQuestion {
  type: 'drag-drop';
  items: DragDropItem[];
  zones: DropZone[];
}

// Pregunta de verdadero/falso
export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

// Unión de todos los tipos de preguntas
export type Question = MultipleChoiceQuestion | FillInBlankQuestion | DragDropQuestion | TrueFalseQuestion;

// Respuesta del usuario
export interface UserAnswer {
  questionId: string;
  selectedAnswer?: string | string[] | boolean | Record<string, string>; // Flexible para diferentes tipos
  isCorrect: boolean;
  timeSpent: number; // Tiempo en segundos
  attempts: number;
}

// Progreso de quiz por usuario
export interface QuizProgress {
  userId: string;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  totalPoints: number;
  maxPoints: number;
  accuracy: number; // Porcentaje
  answers: UserAnswer[];
  levelProgress: {
    basico: { correct: number; total: number };
    intermedio: { correct: number; total: number };
    avanzado: { correct: number; total: number };
  };
  typeProgress: {
    'multiple-choice': { correct: number; total: number };
    'fill-in-blank': { correct: number; total: number };
    'drag-drop': { correct: number; total: number };
    'true-false': { correct: number; total: number };
  };
  completedAt?: Date;
  startedAt: Date;
  lastUpdated: Date;
}

// Estado del quiz actual
export interface QuizState {
  currentQuestionIndex: number;
  questions: Question[];
  userAnswers: UserAnswer[];
  startTime: Date;
  isCompleted: boolean;
  score: number;
}