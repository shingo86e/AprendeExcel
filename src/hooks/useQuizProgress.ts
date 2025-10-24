import { useState, useEffect } from 'react';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { QuizProgress, UserAnswer, Question, QuizLevel, QuestionType } from '@/types/quiz';
import { quizQuestions, getTotalPoints } from '@/data/quizData';

export const useQuizProgress = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calcular estadísticas de progreso
  const calculateProgress = (answers: UserAnswer[]): QuizProgress => {
    if (!user) throw new Error('Usuario no autenticado');

    const totalQuestions = quizQuestions.length;
    const answeredQuestions = answers.length;
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const totalPoints = answers
      .filter(a => a.isCorrect)
      .reduce((sum, a) => {
        const question = quizQuestions.find(q => q.id === a.questionId);
        return sum + (question?.points || 0);
      }, 0);
    
    const maxPoints = getTotalPoints();
    const accuracy = answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0;

    // Progreso por nivel
    const levelProgress = {
      basico: { correct: 0, total: 0 },
      intermedio: { correct: 0, total: 0 },
      avanzado: { correct: 0, total: 0 }
    };

    // Progreso por tipo
    const typeProgress = {
      'multiple-choice': { correct: 0, total: 0 },
      'fill-in-blank': { correct: 0, total: 0 },
      'drag-drop': { correct: 0, total: 0 },
      'true-false': { correct: 0, total: 0 }
    };

    answers.forEach(answer => {
      const question = quizQuestions.find(q => q.id === answer.questionId);
      if (question) {
        // Contar por nivel
        levelProgress[question.level].total++;
        if (answer.isCorrect) {
          levelProgress[question.level].correct++;
        }

        // Contar por tipo
        typeProgress[question.type].total++;
        if (answer.isCorrect) {
          typeProgress[question.type].correct++;
        }
      }
    });

    return {
      userId: user.uid,
      totalQuestions,
      answeredQuestions,
      correctAnswers,
      totalPoints,
      maxPoints,
      accuracy,
      answers,
      levelProgress,
      typeProgress,
      startedAt: new Date(),
      lastUpdated: new Date(),
      completedAt: answeredQuestions === totalQuestions ? new Date() : undefined
    };
  };

  // Guardar progreso en Firestore
  const saveQuizProgress = async (answers: UserAnswer[]): Promise<void> => {
    if (!user) throw new Error('Usuario no autenticado');

    try {
      setLoading(true);
      setError(null);

      const progress = calculateProgress(answers);
      const progressRef = doc(db, 'quizProgress', user.uid);

      await setDoc(progressRef, {
        ...progress,
        startedAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
        completedAt: progress.completedAt ? serverTimestamp() : null
      }, { merge: true });

    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar progreso desde Firestore
  const loadQuizProgress = async (): Promise<QuizProgress | null> => {
    if (!user) return null;

    try {
      setLoading(true);
      setError(null);

      const progressRef = doc(db, 'quizProgress', user.uid);
      const progressSnap = await getDoc(progressRef);

      if (progressSnap.exists()) {
        const data = progressSnap.data();
        return {
          ...data,
          startedAt: data.startedAt?.toDate() || new Date(),
          lastUpdated: data.lastUpdated?.toDate() || new Date(),
          completedAt: data.completedAt?.toDate() || undefined
        } as QuizProgress;
      }

      return null;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Obtener estadísticas generales
  const getQuizStats = async (): Promise<{
    totalAttempts: number;
    bestScore: number;
    averageAccuracy: number;
    completionRate: number;
  }> => {
    if (!user) {
      return { totalAttempts: 0, bestScore: 0, averageAccuracy: 0, completionRate: 0 };
    }

    try {
      const progress = await loadQuizProgress();
      if (!progress) {
        return { totalAttempts: 0, bestScore: 0, averageAccuracy: 0, completionRate: 0 };
      }

      return {
        totalAttempts: 1, // Por ahora solo manejamos un intento
        bestScore: progress.totalPoints,
        averageAccuracy: progress.accuracy,
        completionRate: (progress.answeredQuestions / progress.totalQuestions) * 100
      };
    } catch (err: any) {
      setError(err.message);
      return { totalAttempts: 0, bestScore: 0, averageAccuracy: 0, completionRate: 0 };
    }
  };

  // Obtener progreso por nivel
  const getLevelStats = async (): Promise<{
    basico: { percentage: number; correct: number; total: number };
    intermedio: { percentage: number; correct: number; total: number };
    avanzado: { percentage: number; correct: number; total: number };
  }> => {
    const progress = await loadQuizProgress();
    if (!progress) {
      return {
        basico: { percentage: 0, correct: 0, total: 0 },
        intermedio: { percentage: 0, correct: 0, total: 0 },
        avanzado: { percentage: 0, correct: 0, total: 0 }
      };
    }

    return {
      basico: {
        ...progress.levelProgress.basico,
        percentage: progress.levelProgress.basico.total > 0 
          ? (progress.levelProgress.basico.correct / progress.levelProgress.basico.total) * 100 
          : 0
      },
      intermedio: {
        ...progress.levelProgress.intermedio,
        percentage: progress.levelProgress.intermedio.total > 0 
          ? (progress.levelProgress.intermedio.correct / progress.levelProgress.intermedio.total) * 100 
          : 0
      },
      avanzado: {
        ...progress.levelProgress.avanzado,
        percentage: progress.levelProgress.avanzado.total > 0 
          ? (progress.levelProgress.avanzado.correct / progress.levelProgress.avanzado.total) * 100 
          : 0
      }
    };
  };

  // Obtener progreso por tipo de pregunta
  const getTypeStats = async (): Promise<{
    'multiple-choice': { percentage: number; correct: number; total: number };
    'fill-in-blank': { percentage: number; correct: number; total: number };
    'drag-drop': { percentage: number; correct: number; total: number };
    'true-false': { percentage: number; correct: number; total: number };
  }> => {
    const progress = await loadQuizProgress();
    if (!progress) {
      return {
        'multiple-choice': { percentage: 0, correct: 0, total: 0 },
        'fill-in-blank': { percentage: 0, correct: 0, total: 0 },
        'drag-drop': { percentage: 0, correct: 0, total: 0 },
        'true-false': { percentage: 0, correct: 0, total: 0 }
      };
    }

    const result: any = {};
    Object.entries(progress.typeProgress).forEach(([type, stats]) => {
      result[type] = {
        ...stats,
        percentage: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0
      };
    });

    return result;
  };

  // Resetear progreso (para reiniciar el quiz)
  const resetQuizProgress = async (): Promise<void> => {
    if (!user) throw new Error('Usuario no autenticado');

    try {
      setLoading(true);
      setError(null);

      const progressRef = doc(db, 'quizProgress', user.uid);
      await setDoc(progressRef, {
        userId: user.uid,
        totalQuestions: 0,
        answeredQuestions: 0,
        correctAnswers: 0,
        totalPoints: 0,
        maxPoints: getTotalPoints(),
        accuracy: 0,
        answers: [],
        levelProgress: {
          basico: { correct: 0, total: 0 },
          intermedio: { correct: 0, total: 0 },
          avanzado: { correct: 0, total: 0 }
        },
        typeProgress: {
          'multiple-choice': { correct: 0, total: 0 },
          'fill-in-blank': { correct: 0, total: 0 },
          'drag-drop': { correct: 0, total: 0 },
          'true-false': { correct: 0, total: 0 }
        },
        startedAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
        completedAt: null
      });

    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    saveQuizProgress,
    loadQuizProgress,
    getQuizStats,
    getLevelStats,
    getTypeStats,
    resetQuizProgress,
    calculateProgress
  };
};