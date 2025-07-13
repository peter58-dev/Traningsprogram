import { Injectable, signal } from '@angular/core';
import {
  DocumentData,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { Exercise } from 'src/app/models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  readonly exercises = signal<Exercise[]>([]);
  private unsubscribe: (() => void) | undefined;

  constructor(private fireStore: Firestore) {}

  initExerciseListener() {
    const colRef = collection(this.fireStore, 'exercises');
    this.unsubscribe = onSnapshot(colRef, (snapshot) => {
      const exercises = snapshot.docs
        .map((doc) => parseExerciseDoc(doc.data(), doc.id))
        .filter((ex): ex is Exercise => ex !== null);

      this.exercises.set(exercises);
    });
  }

  async addExercise(exercise: Omit<Exercise, 'id'>) {
    const colRef = collection(this.fireStore, 'exercises');
    await addDoc(colRef, exercise);
  }

  async updateExerciseName(id: string, name: string) {
    const docRef = doc(this.fireStore, 'exercises', id);
    await updateDoc(docRef, { exerciseName: name });
  }

  async deleteExercise(id: string) {
    const docRef = doc(this.fireStore, 'exercises', id);
    await deleteDoc(docRef);
  }

  stopExerciseListener() {
    if (this.unsubscribe) this.unsubscribe();
  }
}

function parseExerciseDoc(doc: DocumentData, id: string): Exercise | null {
  const name = doc['exerciseName'];
  const sets = Array.isArray(doc['sets']) ? doc['sets'] : [];

  if (typeof name !== 'string') {
    console.warn(`❌ Ogiltigt dokument: ${id}`, doc);
    return null;
  }

  return {
    id,
    exerciseName: name,
    sets,
  };
}
