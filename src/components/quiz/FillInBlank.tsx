'use client';

import { useState } from 'react';
import { FillInBlankQuestion } from '@/types/quiz';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface FillInBlankProps {
  question: FillInBlankQuestion;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showResult?: boolean;
  userAnswer?: string;
}

export const FillInBlankComponent: React.FC<FillInBlankProps> = ({
  question,
  onAnswer,
  showResult = false,
  userAnswer = ''
}) => {
  const [answer, setAnswer] = useState<string>(userAnswer);
  const [submitted, setSubmitted] = useState<boolean>(showResult);

  const checkAnswer = (inputAnswer: string): boolean => {
    const normalizedInput = question.caseSensitive 
      ? inputAnswer.trim() 
      : inputAnswer.trim().toLowerCase();
    
    return question.correctAnswers.some(correctAnswer => {
      const normalizedCorrect = question.caseSensitive 
        ? correctAnswer.trim() 
        : correctAnswer.trim().toLowerCase();
      return normalizedInput === normalizedCorrect;
    });
  };

  const handleSubmit = () => {
    if (submitted || !answer.trim()) return;
    
    const isCorrect = checkAnswer(answer);
    setSubmitted(true);
    onAnswer(answer, isCorrect);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !submitted && answer.trim()) {
      handleSubmit();
    }
  };

  const isCorrect = submitted ? checkAnswer(answer) : null;

  const getInputClass = () => {
    const baseClass = "w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 text-gray-900 bg-white ";
    
    if (!submitted) {
      return baseClass + "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none";
    } else {
      if (isCorrect) {
        return baseClass + "border-green-500 bg-green-50 text-green-900";
      } else {
        return baseClass + "border-red-500 bg-red-50 text-red-900";
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          className={getInputClass()}
          placeholder="Escribe tu respuesta aquí..."
          disabled={submitted}
        />
        {submitted && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isCorrect ? (
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            ) : (
              <XCircleIcon className="h-6 w-6 text-red-600" />
            )}
          </div>
        )}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Verificar Respuesta
        </button>
      )}

      {submitted && (
        <div className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center space-x-2 mb-2">
            {isCorrect ? (
              <>
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">¡Correcto!</span>
              </>
            ) : (
              <>
                <XCircleIcon className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-800">Incorrecto</span>
              </>
            )}
          </div>
          
          {!isCorrect && (
            <div className="text-sm text-red-700 mb-2">
              <strong>Respuestas correctas:</strong> {question.correctAnswers.join(', ')}
            </div>
          )}
          
          {question.explanation && (
            <div className="text-sm text-gray-700">
              <strong>Explicación:</strong> {question.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
};