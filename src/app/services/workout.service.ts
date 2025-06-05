import { Injectable, inject, signal } from '@angular/core';
import {
  Firestore,
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { ExerciseInterface } from '../model/exercise';
import { nanoid } from 'nanoid';

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

  async addNewExercise(exerciseName: string) {
    const workoutCollection = collection(this.firestore, 'exerciseProgram');

    const newExercise: ExerciseInterface = {
      id: nanoid(9), // genererar unik ID
      exerciseName: exerciseName, //tar namnnet från formuläret
      sets: [], // 🔹 Starta med tom array för set
    };
    await addDoc(workoutCollection, newExercise);
    await this.loadWorkouts(); //uppdatera listan direkt
  }

  async addSet(
    exerciseId: string,
    newSet: { setNumber: number; weight: string; discs: string; reps: string }
  ) {
    const docRef = doc(this.firestore, 'exerciseProgram', exerciseId);

    await updateDoc(docRef, {
      sets: arrayUnion(newSet), //lägg till ett nytt set i arrayen
    });
    await this.loadWorkouts(); //uppdatera listan direkt
  }
}
