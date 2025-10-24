import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { 
  StudentProgress, 
  ExerciseActivity, 
  FormulaActivity, 
  VideoActivity,
  LEVEL_THRESHOLDS,
  POINTS_SYSTEM 
} from '@/types/progress';

// Hook principal para el progreso del estudiante
export const useStudentProgress = () => {
  const [user] = useAuthState(auth);
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProgress(null);
      setLoading(false);
      return;
    }

    loadUserProgress();
  }, [user]);

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const progressDoc = await getDoc(doc(db, 'studentProgress', user.uid));
      
      if (progressDoc.exists()) {
        const data = progressDoc.data();
        setProgress({
          ...data,
          createdAt: data.createdAt?.toDate(),
          lastActivity: data.lastActivity?.toDate(),
        } as StudentProgress);
      } else {
        // Crear progreso inicial para nuevo usuario
        await initializeUserProgress();
      }
    } catch (err) {
      setError('Error cargando progreso del estudiante');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const initializeUserProgress = async () => {
    if (!user) return;

    const initialProgress: StudentProgress = {
      userId: user.uid,
      email: user.email || '',
      createdAt: new Date(),
      lastActivity: new Date(),
      exercises: {},
      formulas: {},
      videos: {},
      stats: {
        totalExercisesCompleted: 0,
        totalFormulasLearned: 0,
        totalVideosWatched: 0,
        totalTimeSpent: 0,
        level: 'Principiante',
        points: 0
      }
    };

    try {
      await setDoc(doc(db, 'studentProgress', user.uid), {
        ...initialProgress,
        createdAt: serverTimestamp(),
        lastActivity: serverTimestamp()
      });
      setProgress(initialProgress);
    } catch (err) {
      setError('Error inicializando progreso del estudiante');
      console.error(err);
    }
  };

  const updateLastActivity = async () => {
    if (!user) return;
    
    try {
      await updateDoc(doc(db, 'studentProgress', user.uid), {
        lastActivity: serverTimestamp()
      });
    } catch (err) {
      console.error('Error actualizando actividad:', err);
    }
  };

  const calculateLevel = (points: number): StudentProgress['stats']['level'] => {
    if (points >= LEVEL_THRESHOLDS.Avanzado) return 'Avanzado';
    if (points >= LEVEL_THRESHOLDS.Intermedio) return 'Intermedio';
    if (points >= LEVEL_THRESHOLDS.Básico) return 'Básico';
    return 'Principiante';
  };

  return {
    progress,
    loading,
    error,
    updateLastActivity,
    calculateLevel,
    refreshProgress: loadUserProgress
  };
};

// Hook para gestionar progreso de ejercicios
export const useExerciseProgress = () => {
  const [user] = useAuthState(auth);
  const { progress, refreshProgress } = useStudentProgress();

  const markExerciseDownloaded = async (exerciseId: string, exerciseName: string, level: string) => {
    if (!user || !progress) return;

    try {
      const newExerciseProgress = {
        ...progress.exercises[exerciseId],
        downloadedAt: new Date()
      };

      const newStats = {
        ...progress.stats,
        points: progress.stats.points + POINTS_SYSTEM.exercise_download
      };

      await updateDoc(doc(db, 'studentProgress', user.uid), {
        [`exercises.${exerciseId}`]: {
          ...newExerciseProgress,
          downloadedAt: serverTimestamp()
        },
        stats: {
          ...newStats,
          level: calculateLevel(newStats.points)
        },
        lastActivity: serverTimestamp()
      });

      // Registrar actividad
      await addDoc(collection(db, 'activities'), {
        exerciseId,
        exerciseName,
        level,
        action: 'downloaded',
        timestamp: serverTimestamp(),
        userId: user.uid
      } as Omit<ExerciseActivity, 'timestamp'> & { timestamp: any });

      refreshProgress();
    } catch (err) {
      console.error('Error marcando ejercicio como descargado:', err);
    }
  };

  const markExerciseCompleted = async (exerciseId: string, exerciseName: string, level: string, timeSpent: number = 0) => {
    if (!user || !progress) return;

    try {
      const wasAlreadyCompleted = progress.exercises[exerciseId]?.completed;
      const newExerciseProgress = {
        ...progress.exercises[exerciseId],
        completed: true,
        completedAt: new Date(),
        timeSpent: (progress.exercises[exerciseId]?.timeSpent || 0) + timeSpent
      };

      const pointsToAdd = wasAlreadyCompleted ? 0 : POINTS_SYSTEM.exercise_complete;
      const exercisesCompletedIncrement = wasAlreadyCompleted ? 0 : 1;

      const newStats = {
        ...progress.stats,
        totalExercisesCompleted: progress.stats.totalExercisesCompleted + exercisesCompletedIncrement,
        totalTimeSpent: progress.stats.totalTimeSpent + timeSpent,
        points: progress.stats.points + pointsToAdd
      };

      await updateDoc(doc(db, 'studentProgress', user.uid), {
        [`exercises.${exerciseId}`]: {
          ...newExerciseProgress,
          completedAt: serverTimestamp()
        },
        stats: {
          ...newStats,
          level: calculateLevel(newStats.points)
        },
        lastActivity: serverTimestamp()
      });

      // Registrar actividad
      await addDoc(collection(db, 'activities'), {
        exerciseId,
        exerciseName,
        level,
        action: 'completed',
        timestamp: serverTimestamp(),
        userId: user.uid
      } as Omit<ExerciseActivity, 'timestamp'> & { timestamp: any });

      refreshProgress();
    } catch (err) {
      console.error('Error marcando ejercicio como completado:', err);
    }
  };

  const calculateLevel = (points: number): StudentProgress['stats']['level'] => {
    if (points >= LEVEL_THRESHOLDS.Avanzado) return 'Avanzado';
    if (points >= LEVEL_THRESHOLDS.Intermedio) return 'Intermedio';
    if (points >= LEVEL_THRESHOLDS.Básico) return 'Básico';
    return 'Principiante';
  };

  return {
    markExerciseDownloaded,
    markExerciseCompleted
  };
};

// Hook para gestionar progreso de fórmulas
export const useFormulaProgress = () => {
  const [user] = useAuthState(auth);
  const { progress, refreshProgress } = useStudentProgress();

  const markFormulaViewed = async (formulaId: string, formulaName: string, category: string) => {
    if (!user || !progress) return;

    try {
      const wasAlreadyViewed = progress.formulas[formulaId]?.viewed;
      const newFormulaProgress = {
        ...progress.formulas[formulaId],
        viewed: true,
        viewedAt: new Date()
      };

      const pointsToAdd = wasAlreadyViewed ? 0 : POINTS_SYSTEM.formula_view;

      const newStats = {
        ...progress.stats,
        points: progress.stats.points + pointsToAdd
      };

      await updateDoc(doc(db, 'studentProgress', user.uid), {
        [`formulas.${formulaId}`]: {
          ...newFormulaProgress,
          viewedAt: serverTimestamp()
        },
        stats: {
          ...newStats,
          level: calculateLevel(newStats.points)
        },
        lastActivity: serverTimestamp()
      });

      // Registrar actividad
      await addDoc(collection(db, 'activities'), {
        formulaId,
        formulaName,
        category,
        action: 'viewed',
        timestamp: serverTimestamp(),
        userId: user.uid
      } as Omit<FormulaActivity, 'timestamp'> & { timestamp: any });

      refreshProgress();
    } catch (err) {
      console.error('Error marcando fórmula como vista:', err);
    }
  };

  const markFormulaPracticed = async (formulaId: string, formulaName: string, category: string) => {
    if (!user || !progress) return;

    try {
      const wasAlreadyPracticed = progress.formulas[formulaId]?.practiced;
      const newFormulaProgress = {
        ...progress.formulas[formulaId],
        viewed: true,
        practiced: true,
        practicedAt: new Date()
      };

      const pointsToAdd = wasAlreadyPracticed ? 0 : POINTS_SYSTEM.formula_practice;

      const newStats = {
        ...progress.stats,
        points: progress.stats.points + pointsToAdd
      };

      await updateDoc(doc(db, 'studentProgress', user.uid), {
        [`formulas.${formulaId}`]: {
          ...newFormulaProgress,
          practicedAt: serverTimestamp()
        },
        stats: {
          ...newStats,
          level: calculateLevel(newStats.points)
        },
        lastActivity: serverTimestamp()
      });

      // Registrar actividad
      await addDoc(collection(db, 'activities'), {
        formulaId,
        formulaName,
        category,
        action: 'practiced',
        timestamp: serverTimestamp(),
        userId: user.uid
      } as Omit<FormulaActivity, 'timestamp'> & { timestamp: any });

      refreshProgress();
    } catch (err) {
      console.error('Error marcando fórmula como practicada:', err);
    }
  };

  const calculateLevel = (points: number): StudentProgress['stats']['level'] => {
    if (points >= LEVEL_THRESHOLDS.Avanzado) return 'Avanzado';
    if (points >= LEVEL_THRESHOLDS.Intermedio) return 'Intermedio';
    if (points >= LEVEL_THRESHOLDS.Básico) return 'Básico';
    return 'Principiante';
  };

  return {
    markFormulaViewed,
    markFormulaPracticed
  };
};

// Hook para gestionar progreso de videos
export const useVideoProgress = () => {
  const [user] = useAuthState(auth);
  const { progress, refreshProgress } = useStudentProgress();

  const markVideoStarted = async (videoId: string, videoName: string, level: string, totalDuration: number) => {
    if (!user || !progress) return;

    try {
      const newVideoProgress = {
        ...progress.videos[videoId],
        watched: true,
        watchedAt: new Date(),
        watchTime: progress.videos[videoId]?.watchTime || 0,
        totalDuration,
        completed: false
      };

      const pointsToAdd = progress.videos[videoId]?.watched ? 0 : POINTS_SYSTEM.video_start;

      const newStats = {
        ...progress.stats,
        points: progress.stats.points + pointsToAdd
      };

      await updateDoc(doc(db, 'studentProgress', user.uid), {
        [`videos.${videoId}`]: {
          ...newVideoProgress,
          watchedAt: serverTimestamp()
        },
        stats: {
          ...newStats,
          level: calculateLevel(newStats.points)
        },
        lastActivity: serverTimestamp()
      });

      // Registrar actividad
      await addDoc(collection(db, 'activities'), {
        videoId,
        videoName,
        level,
        action: 'started',
        watchTime: 0,
        totalDuration,
        timestamp: serverTimestamp(),
        userId: user.uid
      } as Omit<VideoActivity, 'timestamp'> & { timestamp: any });

      refreshProgress();
    } catch (err) {
      console.error('Error marcando video como iniciado:', err);
    }
  };

  const updateVideoProgress = async (videoId: string, watchTime: number, totalDuration: number) => {
    if (!user || !progress) return;

    try {
      const completionPercentage = (watchTime / totalDuration) * 100;
      const isCompleted = completionPercentage >= 90;
      const wasAlreadyCompleted = progress.videos[videoId]?.completed;

      const newVideoProgress = {
        ...progress.videos[videoId],
        watchTime,
        totalDuration,
        completed: isCompleted
      };

      if (isCompleted && !wasAlreadyCompleted) {
        newVideoProgress.completedAt = new Date();
      }

      const pointsToAdd = (isCompleted && !wasAlreadyCompleted) ? POINTS_SYSTEM.video_complete : 0;
      const videosWatchedIncrement = (isCompleted && !wasAlreadyCompleted) ? 1 : 0;

      const newStats = {
        ...progress.stats,
        totalVideosWatched: progress.stats.totalVideosWatched + videosWatchedIncrement,
        points: progress.stats.points + pointsToAdd
      };

      await updateDoc(doc(db, 'studentProgress', user.uid), {
        [`videos.${videoId}`]: {
          ...newVideoProgress,
          ...(isCompleted && !wasAlreadyCompleted && { completedAt: serverTimestamp() })
        },
        stats: {
          ...newStats,
          level: calculateLevel(newStats.points)
        },
        lastActivity: serverTimestamp()
      });

      refreshProgress();
    } catch (err) {
      console.error('Error actualizando progreso del video:', err);
    }
  };

  const calculateLevel = (points: number): StudentProgress['stats']['level'] => {
    if (points >= LEVEL_THRESHOLDS.Avanzado) return 'Avanzado';
    if (points >= LEVEL_THRESHOLDS.Intermedio) return 'Intermedio';
    if (points >= LEVEL_THRESHOLDS.Básico) return 'Básico';
    return 'Principiante';
  };

  return {
    markVideoStarted,
    updateVideoProgress
  };
};