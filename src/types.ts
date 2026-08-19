export interface Activity {
  id: string;
  zona_id: number; // 1: Confort, 2: Miedo, 3: Aprendizaje, 4: Crecimiento
  descripcion: string;
  sentimiento_id?: number;
  resistencia: number; // 1-5
  habilidad: number; // 1-5
  meta_cumplida: boolean;
  notas?: string;
  timestamp: string;
}

export interface GTDTask {
  id: string;
  title: string;
  context: string; // @ordenador, @llamadas, @en_calle, @focus_modo, @casa
  zona_id: number;
  status: 'inbox' | 'hacer_ya' | 'proxima' | 'clarificar' | 'completed';
  createdAt: string;
  plannedDate?: string;
  notes?: string;
}

export interface Habit {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  zona_id: number;
  streak: number;
  completedPeriods: string[];
}

export interface GOZData {
  activities: Activity[];
  gtdTasks: GTDTask[];
  habits: Habit[];
  totalXP: number;
  streakDays: number;
  lastActiveDate: string;
  leisurePoints: number;
}
