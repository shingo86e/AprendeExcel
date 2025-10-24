'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ClockIcon,
  TrophyIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { QuestionComponent } from '@/components/quiz/QuestionComponent';
import { useAuth } from '@/contexts/AuthContext';
import { useQuizProgress } from '@/hooks/useQuizProgress';
import { Question, UserAnswer, QuizState } from '@/types/quiz';
import { quizQuestions, shuffleQuestions, getTotalPoints } from '@/data/quizData';

export default function QuizPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { saveQuizProgress, loadQuizProgress, loading: progressLoading } = useQuizProgress();
  
  // Estado del quiz
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    questions: shuffleQuestions(quizQuestions),
    userAnswers: [],
    startTime: new Date(),
    isCompleted: false,
    score: 0
  });

  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
  const [savingProgress, setSavingProgress] = useState<boolean>(false);

  // Timer
  useEffect(() => {
    if (quizState.isCompleted) return;

    const timer = setInterval(() => {
      const elapsed = Math.floor((new Date().getTime() - quizState.startTime.getTime()) / 1000);
      setTimeElapsed(elapsed);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.startTime, quizState.isCompleted]);

  // Actualizar tiempo de inicio de pregunta cuando cambia la pregunta
  useEffect(() => {
    setQuestionStartTime(new Date());
  }, [quizState.currentQuestionIndex]);

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const currentAnswer = quizState.userAnswers.find(a => a.questionId === currentQuestion?.id);

  const handleAnswer = async (selectedAnswer: any, isCorrect: boolean, timeSpent: number) => {
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent,
      attempts: 1
    };

    setQuizState(prev => {
      const existingAnswerIndex = prev.userAnswers.findIndex(a => a.questionId === currentQuestion.id);
      let updatedAnswers = [...prev.userAnswers];
      
      if (existingAnswerIndex >= 0) {
        updatedAnswers[existingAnswerIndex] = {
          ...newAnswer,
          attempts: updatedAnswers[existingAnswerIndex].attempts + 1
        };
      } else {
        updatedAnswers.push(newAnswer);
      }

      const newScore = updatedAnswers
        .filter(a => a.isCorrect)
        .reduce((sum, a) => {
          const question = prev.questions.find(q => q.id === a.questionId);
          return sum + (question?.points || 0);
        }, 0);

      // Guardar progreso parcial (sin bloquear la UI)
      saveQuizProgress(updatedAnswers).catch(console.error);

      return {
        ...prev,
        userAnswers: updatedAnswers,
        score: newScore
      };
    });
  };

  const goToNextQuestion = () => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      completeQuiz();
    }
  };

  const goToPreviousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const completeQuiz = async () => {
    setQuizState(prev => ({
      ...prev,
      isCompleted: true
    }));
    
    // Guardar progreso final en Firestore
    try {
      setSavingProgress(true);
      await saveQuizProgress(quizState.userAnswers);
    } catch (error) {
      console.error('Error guardando progreso final:', error);
    } finally {
      setSavingProgress(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    return Math.round((quizState.userAnswers.length / quizState.questions.length) * 100);
  };

  const getCorrectAnswersCount = (): number => {
    return quizState.userAnswers.filter(a => a.isCorrect).length;
  };

  if (quizState.isCompleted) {
    const totalPoints = getTotalPoints();
    const accuracyPercentage = Math.round((getCorrectAnswersCount() / quizState.questions.length) * 100);
    
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              {savingProgress && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">Guardando tu progreso...</p>
                </div>
              )}
              
              <div className="mb-6">
                <div className="mx-auto h-20 w-20 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <TrophyIcon className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Quiz Completado!</h1>
                <p className="text-gray-600">Excelente trabajo completando el quiz de Excel</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{quizState.score}</div>
                  <div className="text-sm text-gray-600">de {totalPoints} puntos</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{getCorrectAnswersCount()}</div>
                  <div className="text-sm text-gray-600">de {quizState.questions.length} correctas</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{accuracyPercentage}%</div>
                  <div className="text-sm text-gray-600">de precisión</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{formatTime(timeElapsed)}</div>
                  <div className="text-sm text-gray-600">tiempo total</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/progreso')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver Mi Progreso
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Volver al Inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!currentQuestion) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900">Cargando quiz...</h2>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header del quiz */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">{formatTime(timeElapsed)}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Pregunta {quizState.currentQuestionIndex + 1} de {quizState.questions.length}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-700">
                  {quizState.score} puntos
                </div>
                <div className="text-sm text-gray-600">
                  {getCorrectAnswersCount()}/{quizState.userAnswers.length} correctas
                </div>
              </div>
            </div>

            {/* Barra de progreso */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progreso</span>
                <span>{getProgressPercentage()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Pregunta actual */}
          <div className="mb-6">
            <QuestionComponent
              question={currentQuestion}
              onAnswer={handleAnswer}
              showResult={!!currentAnswer}
              userAnswer={currentAnswer}
              startTime={questionStartTime}
            />
          </div>

          {/* Navegación */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center">
              <button
                onClick={goToPreviousQuestion}
                disabled={quizState.currentQuestionIndex === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                <span>Anterior</span>
              </button>

              <div className="flex space-x-2">
                {quizState.questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === quizState.currentQuestionIndex
                        ? 'bg-blue-600'
                        : quizState.userAnswers.some(a => a.questionId === quizState.questions[index].id)
                        ? quizState.userAnswers.find(a => a.questionId === quizState.questions[index].id)?.isCorrect
                          ? 'bg-green-500'
                          : 'bg-red-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goToNextQuestion}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>
                  {quizState.currentQuestionIndex === quizState.questions.length - 1 ? 'Finalizar' : 'Siguiente'}
                </span>
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}