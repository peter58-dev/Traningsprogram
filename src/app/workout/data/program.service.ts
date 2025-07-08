import { Injectable, signal } from '@angular/core';
import { Program } from './workout.model';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  // Signal för listan av program
  readonly programs = signal<Program[]>([]);

  private unsubscribe: (() => void) | undefined;

  constructor(private firestore: Firestore) {
    this.initTrainingProgramListener();
  }

  // Läser och lyssnar på program i Firestore, uppdaterar signalen
  initTrainingProgramListener() {
    const colRef = collection(this.firestore, 'trainingPrograms');
    this.unsubscribe = onSnapshot(colRef, (snapshot) => {
      const workouts = snapshot.docs
        .map((doc) => {
          const data = doc.data() as Omit<Program, 'id'>;
          return {
            id: doc.id,
            ...data,
          };
        })
        .sort((a, b) => a.workoutName.localeCompare(b.workoutName));

      this.programs.set(workouts);
    });
  }

  // Skapar ett nytt program, Firestore autogenererar id
  async addProgram(program: Omit<Program, 'id'>) {
    const colRef = collection(this.firestore, 'trainingPrograms');
    await addDoc(colRef, program);
  }

  // Uppdaterar workoutName på ett befintligt program
  async updateProgram(id: string, workoutName: string) {
    const docRef = doc(this.firestore, 'trainingPrograms', id);
    await updateDoc(docRef, { workoutName });
  }

  // Tar bort ett program
  async deleteProgram(id: string) {
    const docRef = doc(this.firestore, 'trainingPrograms', id);
    await deleteDoc(docRef);
  }

  // Avsluta lyssning när det behövs (t.ex. vid komponent-destroy)
  stopTrainingProgramsListener() {
    if (this.unsubscribe) this.unsubscribe();
  }
}
