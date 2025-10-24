'use client';

import { Question, UserAnswer } from '@/types/quiz';
import { MultipleChoiceComponent } from './MultipleChoice';
import { FillInBlankComponent } from './FillInBlank';
import { TrueFalseComponent } from './TrueFalse';
import { DragDropComponent } from './DragDrop';

interface QuestionComponentProps {
  question: Question;
  onAnswer: (answer: any, isCorrect: boolean, timeSpent: number) => void;
  showResult?: boolean;
  userAnswer?: UserAnswer;
  startTime?: Date;
}

export const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  onAnswer,
  showResult = false,
  userAnswer,
  startTime = new Date()
}) => {
  const handleAnswer = (answer: any, isCorrect: boolean) => {
    const timeSpent = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
    onAnswer(answer, isCorrect, timeSpent);
  };

  const getLevelBadgeClass = () => {
    switch (question.level) {
      case 'basico':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermedio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'avanzado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeBadgeClass = () => {
    switch (question.type) {
      case 'multiple-choice':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fill-in-blank':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'drag-drop':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'true-false':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeLabel = () => {
    switch (question.type) {
      case 'multiple-choice':
        return 'Múltiple Opción';
      case 'fill-in-blank':
        return 'Completar';
      case 'drag-drop':
        return 'Arrastrar y Soltar';
      case 'true-false':
        return 'Verdadero/Falso';
      default:
        return 'Pregunta';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      {/* Header con badges */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getLevelBadgeClass()}`}>
            {question.level.charAt(0).toUpperCase() + question.level.slice(1)}
          </span>
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getTypeBadgeClass()}`}>
            {getTypeLabel()}
          </span>
        </div>
        <div className="text-sm font-medium text-gray-600">
          {question.points} {question.points === 1 ? 'punto' : 'puntos'}
        </div>
      </div>

      {/* Pregunta */}
      <div className="space-y-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-relaxed">
          {question.question}
        </h3>

        {/* Componente específico según el tipo */}
        <div className="mt-6">
          {question.type === 'multiple-choice' && (
            <MultipleChoiceComponent
              question={question}
              onAnswer={handleAnswer}
              showResult={showResult}
              selectedAnswer={userAnswer?.selectedAnswer as string}
            />
          )}
          
          {question.type === 'fill-in-blank' && (
            <FillInBlankComponent
              question={question}
              onAnswer={handleAnswer}
              showResult={showResult}
              userAnswer={userAnswer?.selectedAnswer as string}
            />
          )}
          
          {question.type === 'true-false' && (
            <TrueFalseComponent
              question={question}
              onAnswer={handleAnswer}
              showResult={showResult}
              userAnswer={userAnswer?.selectedAnswer as boolean}
            />
          )}
          
          {question.type === 'drag-drop' && (
            <DragDropComponent
              question={question}
              onAnswer={handleAnswer}
              showResult={showResult}
              userAnswers={userAnswer?.selectedAnswer as Record<string, string>}
            />
          )}
        </div>
      </div>
    </div>
  );
};