import { ExerciseSet } from './set.model';

/**
 * Modell för en träningsövning.
 */
export interface Exercise {
  /**
   * Unikt ID för övningen, genererat av Firestore.
   */
  id: string;

  /**
   * Namnet på övningen, t.ex. "Knäböj".
   */
  exerciseName: string;

  /**
   * En lista med set, t.ex. reps eller vikt, beroende på hur du designat den.
   */
  sets: any[]; // Du kan ersätta `any` med en tydligare typ senare.
}
