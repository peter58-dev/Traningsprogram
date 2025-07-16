export interface Program {
  id?: string;
  workoutName: string;
  createdAt?: Date;
  duration?: number;
  type?: string;
}

export interface CreateProgramInput {
  workoutName: string;
  duration?: number;
  type?: string;
}
