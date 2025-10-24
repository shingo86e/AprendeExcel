'use client';

import { useState } from 'react';
import { MultipleChoiceQuestion } from '@/types/quiz';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  onAnswer: (selectedAnswer: string, isCorrect: boolean) => void;
  showResult?: boolean;
  selectedAnswer?: string;
}

export const MultipleChoiceComponent: React.FC<MultipleChoiceProps> = ({
  question,
  onAnswer,
  showResult = false,
  selectedAnswer
}) => {
  const [selected, setSelected] = useState<string>(selectedAnswer || '');

  const handleOptionSelect = (optionId: string) => {
    if (showResult) return; // No permitir cambios si ya se mostró el resultado
    
    setSelected(optionId);
    const selectedOption = question.options.find(opt => opt.id === optionId);
    const isCorrect = selectedOption?.isCorrect || false;
    
    onAnswer(optionId, isCorrect);
  };

  const getOptionClass = (option: any) => {
    const baseClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ";
    
    if (!showResult) {
      // Estado normal (sin mostrar resultado)
      if (selected === option.id) {
        return baseClass + "border-blue-500 bg-blue-50 text-blue-900";
      }
      return baseClass + "border-gray-300 bg-white text-gray-800 hover:border-blue-300 hover:bg-blue-50";
    } else {
      // Mostrar resultado
      if (option.isCorrect) {
        return baseClass + "border-green-500 bg-green-50 text-green-900";
      } else if (selected === option.id && !option.isCorrect) {
        return baseClass + "border-red-500 bg-red-50 text-red-900";
      }
      return baseClass + "border-gray-300 bg-gray-50 text-gray-700";
    }
  };

  const getOptionIcon = (option: any) => {
    if (!showResult) return null;
    
    if (option.isCorrect) {
      return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
    } else if (selected === option.id && !option.isCorrect) {
      return <XCircleIcon className="h-5 w-5 text-red-600" />;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            className={getOptionClass(option)}
            disabled={showResult}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base font-medium">{option.text}</span>
              {getOptionIcon(option)}
            </div>
          </button>
        ))}
      </div>
      
      {showResult && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Explicación:</strong> {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};