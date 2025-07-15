import { Injectable, signal } from '@angular/core';
import {
  Firestore,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
} from '@angular/fire/firestore';
import { Exercise } from '../models/exercise.model';
import { getExerciseCollection, getExerciseDoc } from '../firestore-utils/firestore-paths';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  readonly exercises = signal<Exercise[]>([]);
  private unsubscribe: (() => void) | undefined;

  constructor(private firestore: Firestore) {}

  initExerciseListener(programId: string) {
    const colRef = getExerciseCollection(this.firestore, programId);
    this.unsubscribe = onSnapshot(colRef, (snapshot) => {
      const exercises = snapshot.docs
        .map((doc) => parseExerciseDoc(doc.data(), doc.id))
        .filter((ex): ex is Exercise => ex !== null);
      this.exercises.set(exercises);
    });
  }

  async addExercise(programId: string, exercise: Omit<Exercise, 'id'>) {
    const colRef = getExerciseCollection(this.firestore, programId);
    await addDoc(colRef, exercise);
  }

  async updateExercise(programId: string, exerciseId: string, updates: Partial<Exercise>) {
    const docRef = getExerciseDoc(this.firestore, programId, exerciseId);
    await updateDoc(docRef, updates);
  }

  async deleteExercise(programId: string, exerciseId: string) {
    const docRef = getExerciseDoc(this.firestore, programId, exerciseId);
    await deleteDoc(docRef);
  }

  stopExerciseListener() {
    if (this.unsubscribe) this.unsubscribe();
  }
}

function parseExerciseDoc(doc: DocumentData, id: string): Exercise | null {
  const exerciseName = doc['exerciseName'];
  if (typeof exerciseName !== 'string') {
    console.warn(`⚠️ Ogiltigt dokument: ${id}`, doc);
    return null;
  }

  return {
    id,
    exerciseName,
    muscleGroup: typeof doc['muscleGroup'] === 'string' ? doc['muscleGroup'] : undefined,
    restTime: typeof doc['restTime'] === 'number' ? doc['restTime'] : undefined,
    order: typeof doc['order'] === 'number' ? doc['order'] : undefined,
  };
}
