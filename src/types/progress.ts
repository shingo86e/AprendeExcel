// Tipos para el progreso del estudiante
export interface StudentProgress {
  userId: string;
  email: string;
  name?: string;
  createdAt: Date;
  lastActivity: Date;
  
  // Progreso de ejercicios
  exercises: {
    [exerciseId: string]: {
      completed: boolean;
      completedAt?: Date;
      downloadedAt?: Date;
      timeSpent?: number; // en minutos
    };
  };
  
  // Progreso de fórmulas
  formulas: {
    [formulaId: string]: {
      viewed: boolean;
      practiced: boolean;
      mastered: boolean;
      viewedAt?: Date;
      practicedAt?: Date;
      masteredAt?: Date;
      downloadedFile?: boolean;
    };
  };
  
  // Progreso de videos
  videos: {
    [videoId: string]: {
      watched: boolean;
      watchedAt?: Date;
      watchTime: number; // tiempo visto en segundos
      totalDuration: number; // duración total del video
      completed: boolean; // visto completamente (>90%)
      completedAt?: Date;
    };
  };
  
  // Estadísticas generales
  stats: {
    totalExercisesCompleted: number;
    totalFormulasLearned: number;
    totalVideosWatched: number;
    totalTimeSpent: number; // en minutos
    level: 'Principiante' | 'Básico' | 'Intermedio' | 'Avanzado';
    points: number;
  };
}

// Tipos para actividades específicas
export interface ExerciseActivity {
  exerciseId: string;
  exerciseName: string;
  level: string;
  action: 'downloaded' | 'completed';
  timestamp: Date;
  userId: string;
}

export interface FormulaActivity {
  formulaId: string;
  formulaName: string;
  category: string;
  action: 'viewed' | 'practiced' | 'mastered' | 'downloaded';
  timestamp: Date;
  userId: string;
}

export interface VideoActivity {
  videoId: string;
  videoName: string;
  level: string;
  action: 'started' | 'progress' | 'completed';
  watchTime: number;
  totalDuration: number;
  timestamp: Date;
  userId: string;
}

// Esquema de nivel del estudiante
export const LEVEL_THRESHOLDS = {
  Principiante: 0,
  Básico: 100,
  Intermedio: 300,
  Avanzado: 600
};

export const POINTS_SYSTEM = {
  exercise_download: 5,
  exercise_complete: 15,
  formula_view: 2,
  formula_practice: 5,
  formula_master: 10,
  video_start: 3,
  video_complete: 20,
  daily_activity: 5
};