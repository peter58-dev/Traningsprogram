export interface ExerciseInterface {
  id: string;
  exerciseName: string;
  sets: {
    setNumber: number;
    weight: string;
    discs: string;
    reps: string;
  }[];
}

// sets är en array som gör det enkelt att hantera flera set
