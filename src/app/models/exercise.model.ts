import { ExerciseSet } from './set.model';

export interface Exercise {
  id: string;
  exerciseName: string;
  sets: ExerciseSet[];
}
