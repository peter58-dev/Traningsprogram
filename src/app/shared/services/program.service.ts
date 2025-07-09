import { Injectable, signal } from '@angular/core';
import { Program } from '../../workout/models/workout.model';
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

  // Lyssnar på alla träningsprogram
  initTrainingProgramListener() {
    const colRef = collection(this.firestore, 'trainingPrograms');
    this.unsubscribe = onSnapshot(colRef, (snapshot) => {
      const programs = snapshot.docs
        .map((doc) => parseProgramDoc(doc.data(), doc.id))
        .filter((program): program is Program => program !== null)
        .sort((a, b) => a.workoutName.localeCompare(b.workoutName));

      this.programs.set(programs);
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

// Hjälpfunktion för att tolka dokument och hantera saknade fält
function parseProgramDoc(doc: DocumentData, id: string): Program | null {
  const workoutName = doc['workoutName'] || doc['namn'];

  if (typeof workoutName !== 'string') {
    console.warn(`⚠️ Ogiltigt dokument: ${id}`, doc);
    return null;
  }

  // duration och type är valfria, inkluderas bara om de finns och är rätt typ
  const duration = typeof doc['duration'] === 'number' ? doc['duration'] : undefined;
  const type = typeof doc['type'] === 'string' ? doc['type'] : undefined;

  return {
    id,
    workoutName,
    duration,
    type,
  };
}
