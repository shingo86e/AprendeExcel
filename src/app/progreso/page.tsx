'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useQuizProgress } from '@/hooks/useQuizProgress';
import { 
  ChartBarIcon,
  TrophyIcon,
  ClockIcon,
  AcademicCapIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  FireIcon
} from '@heroicons/react/24/outline';

export default function ProgresoPage() {
  const { loadQuizProgress, getQuizStats, getLevelStats, getTypeStats, loading } = useQuizProgress();
  
  const [quizProgress, setQuizProgress] = useState<any>(null);
  const [generalStats, setGeneralStats] = useState<any>(null);
  const [levelStats, setLevelStats] = useState<any>(null);
  const [typeStats, setTypeStats] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [progress, general, levels, types] = await Promise.all([
          loadQuizProgress(),
          getQuizStats(),
          getLevelStats(),
          getTypeStats()
        ]);
        
        setQuizProgress(progress);
        setGeneralStats(general);
        setLevelStats(levels);
        setTypeStats(types);
      } catch (error) {
        console.error('Error cargando datos de progreso:', error);
      }
    };

    loadData();
  }, []);

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getPerformanceIcon = (percentage: number) => {
    if (percentage >= 80) return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
    if (percentage >= 60) return <StarIcon className="h-5 w-5 text-yellow-600" />;
    return <XCircleIcon className="h-5 w-5 text-red-600" />;
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const ProgressBar = ({ percentage, color = 'blue' }: { percentage: number; color?: string }) => {
    const colorClasses = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      yellow: 'bg-yellow-600',
      red: 'bg-red-600',
      purple: 'bg-purple-600',
      orange: 'bg-orange-600'
    };

    return (
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-500 ${colorClasses[color as keyof typeof colorClasses]}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    );
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Navbar title="Mi Progreso" icon={ChartBarIcon} currentPage="progreso" />
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando tu progreso...</p>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!quizProgress || !generalStats) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Navbar title="Mi Progreso" icon={ChartBarIcon} currentPage="progreso" />
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ChartBarIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Aún no has completado el quiz</h2>
              <p className="text-gray-600 mb-8">
                Completa el quiz de Excel para ver tu progreso y estadísticas detalladas.
              </p>
              <button
                onClick={() => window.location.href = '/quiz'}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Comenzar Quiz
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar title="Mi Progreso" icon={ChartBarIcon} currentPage="progreso" />
        
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header con resumen general */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">¡Sigue tu avance paso a paso!</h1>
                  <p className="text-blue-100">Tu progreso en el aprendizaje de Excel</p>
                </div>
                <div className="hidden md:block">
                  <TrophyIcon className="h-16 w-16 text-yellow-300" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircleIcon className="h-8 w-8 text-green-300" />
                    <div>
                      <div className="text-2xl font-bold">{quizProgress.correctAnswers}</div>
                      <div className="text-sm text-blue-100">Respuestas Correctas</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <StarIcon className="h-8 w-8 text-yellow-300" />
                    <div>
                      <div className="text-2xl font-bold">{Math.round(quizProgress.accuracy)}%</div>
                      <div className="text-sm text-blue-100">Precisión</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <FireIcon className="h-8 w-8 text-orange-300" />
                    <div>
                      <div className="text-2xl font-bold">{quizProgress.totalPoints}</div>
                      <div className="text-sm text-blue-100">Puntos Totales</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <ArrowTrendingUpIcon className="h-8 w-8 text-green-300" />
                    <div>
                      <div className="text-2xl font-bold">{Math.round(generalStats.completionRate)}%</div>
                      <div className="text-sm text-blue-100">Completado</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Progreso por Nivel */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <AcademicCapIcon className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Progreso por Nivel</h2>
              </div>
              
              <div className="space-y-6">
                {levelStats && Object.entries(levelStats).map(([level, stats]: [string, any]) => (
                  <div key={level} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getPerformanceIcon(stats.percentage)}
                        <span className="font-medium text-gray-900 capitalize">
                          {level === 'basico' ? 'Básico' : level === 'intermedio' ? 'Intermedio' : 'Avanzado'}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{Math.round(stats.percentage)}%</div>
                        <div className="text-sm text-gray-500">{stats.correct}/{stats.total}</div>
                      </div>
                    </div>
                    <ProgressBar 
                      percentage={stats.percentage} 
                      color={level === 'basico' ? 'green' : level === 'intermedio' ? 'yellow' : 'red'} 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Progreso por Tipo de Pregunta */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Progreso por Tipo</h2>
              </div>
              
              <div className="space-y-6">
                {typeStats && Object.entries(typeStats).map(([type, stats]: [string, any]) => {
                  const typeLabels = {
                    'multiple-choice': 'Múltiple Opción',
                    'fill-in-blank': 'Completar',
                    'drag-drop': 'Arrastrar y Soltar',
                    'true-false': 'Verdadero/Falso'
                  };
                  
                  const colors = {
                    'multiple-choice': 'blue',
                    'fill-in-blank': 'purple',
                    'drag-drop': 'orange',
                    'true-false': 'green'
                  };

                  return (
                    <div key={type} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getPerformanceIcon(stats.percentage)}
                          <span className="font-medium text-gray-900">
                            {typeLabels[type as keyof typeof typeLabels]}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{Math.round(stats.percentage)}%</div>
                          <div className="text-sm text-gray-500">{stats.correct}/{stats.total}</div>
                        </div>
                      </div>
                      <ProgressBar 
                        percentage={stats.percentage} 
                        color={colors[type as keyof typeof colors]} 
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Estadísticas detalladas */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Estadísticas Detalladas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {quizProgress.answeredQuestions}/{quizProgress.totalQuestions}
                </div>
                <div className="text-sm text-gray-600">Preguntas Respondidas</div>
                <div className="mt-2">
                  <ProgressBar percentage={(quizProgress.answeredQuestions / quizProgress.totalQuestions) * 100} color="blue" />
                </div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round(quizProgress.accuracy)}%
                </div>
                <div className="text-sm text-gray-600">Precisión General</div>
                <div className="mt-2">
                  <ProgressBar percentage={quizProgress.accuracy} color="green" />
                </div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {quizProgress.totalPoints}/{quizProgress.maxPoints}
                </div>
                <div className="text-sm text-gray-600">Puntuación</div>
                <div className="mt-2">
                  <ProgressBar percentage={(quizProgress.totalPoints / quizProgress.maxPoints) * 100} color="purple" />
                </div>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Continúa Aprendiendo</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => window.location.href = '/quiz'}
                className="p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors text-left"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <TrophyIcon className="h-6 w-6 text-blue-600" />
                  <span className="font-medium text-blue-900">Repetir Quiz</span>
                </div>
                <p className="text-sm text-blue-700">Mejora tu puntuación y domina Excel</p>
              </button>
              
              <button
                onClick={() => window.location.href = '/ejercicios'}
                className="p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors text-left"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <AcademicCapIcon className="h-6 w-6 text-green-600" />
                  <span className="font-medium text-green-900">Practicar Ejercicios</span>
                </div>
                <p className="text-sm text-green-700">Refuerza tus conocimientos con ejercicios</p>
              </button>
              
              <button
                onClick={() => window.location.href = '/videos'}
                className="p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors text-left"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <ClockIcon className="h-6 w-6 text-purple-600" />
                  <span className="font-medium text-purple-900">Ver Videos</span>
                </div>
                <p className="text-sm text-purple-700">Aprende con contenido audiovisual</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}