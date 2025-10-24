'use client';

import { useState, useRef } from 'react';
import { DragDropQuestion, DragDropItem, DropZone } from '@/types/quiz';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface DragDropProps {
  question: DragDropQuestion;
  onAnswer: (answers: Record<string, string>, isCorrect: boolean) => void;
  showResult?: boolean;
  userAnswers?: Record<string, string>;
}

export const DragDropComponent: React.FC<DragDropProps> = ({
  question,
  onAnswer,
  showResult = false,
  userAnswers = {}
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedItems, setDroppedItems] = useState<Record<string, string>>(userAnswers);
  const [submitted, setSubmitted] = useState<boolean>(showResult);
  const dragCounter = useRef(0);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    if (submitted) return;
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    dragCounter.current = 0;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
  };

  const handleDragLeave = (e: React.DragEvent) => {
    dragCounter.current--;
  };

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    if (!draggedItem || submitted) return;

    // Remover el item de su zona anterior (si estaba en alguna)
    const updatedDroppedItems = { ...droppedItems };
    Object.keys(updatedDroppedItems).forEach(zone => {
      if (updatedDroppedItems[zone] === draggedItem) {
        delete updatedDroppedItems[zone];
      }
    });

    // Agregar el item a la nueva zona
    updatedDroppedItems[zoneId] = draggedItem;
    setDroppedItems(updatedDroppedItems);
    setDraggedItem(null);
    dragCounter.current = 0;
  };

  const checkAnswers = (): boolean => {
    return question.items.every(item => {
      return droppedItems[item.correctZone] === item.id;
    });
  };

  const handleSubmit = () => {
    if (submitted) return;
    
    const isCorrect = checkAnswers();
    setSubmitted(true);
    onAnswer(droppedItems, isCorrect);
  };

  const getItemInZone = (zoneId: string): DragDropItem | null => {
    const itemId = droppedItems[zoneId];
    return question.items.find(item => item.id === itemId) || null;
  };

  const getAvailableItems = (): DragDropItem[] => {
    const droppedItemIds = Object.values(droppedItems);
    return question.items.filter(item => !droppedItemIds.includes(item.id));
  };

  const isZoneCorrect = (zoneId: string): boolean => {
    const itemInZone = getItemInZone(zoneId);
    if (!itemInZone) return false;
    return itemInZone.correctZone === zoneId;
  };

  const getZoneClass = (zoneId: string) => {
    const baseClass = "min-h-[80px] p-4 border-2 border-dashed rounded-lg transition-all duration-200 ";
    const hasItem = getItemInZone(zoneId) !== null;
    
    if (!submitted) {
      if (draggedItem && !hasItem) {
        return baseClass + "border-blue-400 bg-blue-50";
      } else if (hasItem) {
        return baseClass + "border-gray-400 bg-gray-50";
      }
      return baseClass + "border-gray-300 bg-gray-50";
    } else {
      // Mostrar resultado
      if (hasItem) {
        if (isZoneCorrect(zoneId)) {
          return baseClass + "border-green-500 bg-green-50";
        } else {
          return baseClass + "border-red-500 bg-red-50";
        }
      }
      return baseClass + "border-gray-300 bg-gray-100";
    }
  };

  const getItemClass = (inZone: boolean = false) => {
    const baseClass = "p-3 bg-white border rounded-lg cursor-move shadow-sm transition-all duration-200 text-gray-800 font-medium ";
    if (submitted) {
      return baseClass + "cursor-default";
    }
    return baseClass + "hover:shadow-md hover:scale-105";
  };

  const allItemsPlaced = Object.keys(droppedItems).length === question.items.length;

  return (
    <div className="space-y-6">
      {/* Items disponibles */}
      {!submitted && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Arrastra los elementos:</h4>
          <div className="flex flex-wrap gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg min-h-[80px]">
            {getAvailableItems().map((item) => (
              <div
                key={item.id}
                draggable={!submitted}
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragEnd={handleDragEnd}
                className={getItemClass()}
              >
                <span className="text-gray-800">{item.content}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zonas de destino */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">Suelta en las zonas correctas:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.zones.map((zone) => {
            const itemInZone = getItemInZone(zone.id);
            return (
              <div
                key={zone.id}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, zone.id)}
                className={getZoneClass(zone.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-gray-900">{zone.label}</span>
                  {submitted && itemInZone && (
                    isZoneCorrect(zone.id) ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-600" />
                    )
                  )}
                </div>
                {itemInZone && (
                  <div className={getItemClass(true)}>
                    <span className="text-gray-800">{itemInZone.content}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Botón de verificar */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allItemsPlaced}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Verificar Respuestas
        </button>
      )}

      {/* Resultado */}
      {submitted && (
        <div className={`p-4 rounded-lg border ${
          checkAnswers() ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {checkAnswers() ? (
              <>
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">¡Todas las respuestas son correctas!</span>
              </>
            ) : (
              <>
                <XCircleIcon className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-800">Algunas respuestas son incorrectas</span>
              </>
            )}
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