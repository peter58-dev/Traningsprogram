// src/app/models/exercise.model.ts
import { ExerciseSet } from './set.model';

export interface Exercise {
  id: string;
  exerciseName: string;
  muscleGroup?: string;
  restTime?: number;
  order?: number;
  sets?: ExerciseSet[]; // Om du vill koppla set direkt
}
