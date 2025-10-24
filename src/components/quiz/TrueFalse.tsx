'use client';

import { useState } from 'react';
import { TrueFalseQuestion } from '@/types/quiz';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface TrueFalseProps {
  question: TrueFalseQuestion;
  onAnswer: (answer: boolean, isCorrect: boolean) => void;
  showResult?: boolean;
  userAnswer?: boolean;
}

export const TrueFalseComponent: React.FC<TrueFalseProps> = ({
  question,
  onAnswer,
  showResult = false,
  userAnswer
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(userAnswer ?? null);

  const handleAnswerSelect = (answer: boolean) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === question.correctAnswer;
    onAnswer(answer, isCorrect);
  };

  const getButtonClass = (buttonValue: boolean) => {
    const baseClass = "flex-1 p-4 border-2 rounded-lg transition-all duration-200 font-medium ";
    
    if (!showResult) {
      if (selectedAnswer === buttonValue) {
        return baseClass + "border-blue-500 bg-blue-50 text-blue-900";
      }
      return baseClass + "border-gray-300 bg-white text-gray-800 hover:border-blue-300 hover:bg-blue-50";
    } else {
      // Mostrar resultado
      if (buttonValue === question.correctAnswer) {
        return baseClass + "border-green-500 bg-green-50 text-green-900";
      } else if (selectedAnswer === buttonValue && buttonValue !== question.correctAnswer) {
        return baseClass + "border-red-500 bg-red-50 text-red-900";
      }
      return baseClass + "border-gray-300 bg-gray-50 text-gray-700";
    }
  };

  const getButtonIcon = (buttonValue: boolean) => {
    if (!showResult) return null;
    
    if (buttonValue === question.correctAnswer) {
      return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
    } else if (selectedAnswer === buttonValue && buttonValue !== question.correctAnswer) {
      return <XCircleIcon className="h-5 w-5 text-red-600" />;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={() => handleAnswerSelect(true)}
          className={getButtonClass(true)}
          disabled={showResult}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Verdadero</span>
            {getButtonIcon(true)}
          </div>
        </button>
        
        <button
          onClick={() => handleAnswerSelect(false)}
          className={getButtonClass(false)}
          disabled={showResult}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Falso</span>
            {getButtonIcon(false)}
          </div>
        </button>
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg border ${
          selectedAnswer === question.correctAnswer 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {selectedAnswer === question.correctAnswer ? (
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
          
          <div className="text-sm text-gray-700 mb-2">
            <strong>Respuesta correcta:</strong> {question.correctAnswer ? 'Verdadero' : 'Falso'}
          </div>
          
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