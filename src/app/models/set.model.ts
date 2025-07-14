/**
 * Representerar ett enskilt träningsset i en övning.
 */
export interface ExerciseSet {
  /**
   * Set-nummer, t.ex. 1 för första setet.
   */
  set: number;

  /**
   * Antal repetitioner som ska utföras i setet.
   */
  reps: number;

  /**
   * Vikt som används i setet, i kilogram.
   */
  weight: number;
}
