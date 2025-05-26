import { Injectable, inject, signal } from '@angular/core';
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from '@angular/fire/firestore';
import { ExerciseInterface } from '../model/exercise';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private firestore = inject(Firestore);
  private workoutCollection = collection(this.firestore, 'exerciseProgram');

  //signal för att lagra övningar
  workouts = signal<ExerciseInterface[]>([]);

  constructor() {}

  async loadWorkouts() {
    const querySnapshot = await getDocs(this.workoutCollection);
    this.workouts.set(
      querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as ExerciseInterface)
      )
    );
  }

  async deleteExercise(id: string) {
    const docRef = doc(this.firestore, 'exerciseProgram', id); // 🔹 Rätt sätt att referera till dokumentet
    await deleteDoc(docRef);
    await this.loadWorkouts(); // 🔹 Uppdatera listan direkt
  }
}
