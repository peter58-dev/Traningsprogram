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
import { ExerciseInterface } from '../model/program-interface';
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
}
