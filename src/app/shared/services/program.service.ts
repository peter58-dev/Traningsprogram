import { Injectable, signal } from '@angular/core';
import {
  Firestore,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
  Timestamp,
  serverTimestamp,
} from '@angular/fire/firestore';
import { CreateProgramInput, Program } from '../models/program.model';
import { getProgramCollection, getProgramDoc } from '../firestore-utils/firestore-paths';

@Injectable({ providedIn: 'root' })
export class ProgramService {
  readonly programs = signal<Program[]>([]);
  private unsubscribe: (() => void) | undefined;

  constructor(private firestore: Firestore) {}

  initTrainingProgramListener() {
    const colRef = getProgramCollection(this.firestore);
    this.unsubscribe = onSnapshot(colRef, (snapshot) => {
      const programs = snapshot.docs
        .map((doc) => parseProgramDoc(doc.data(), doc.id))
        .filter((program): program is Program => program !== null)
        .sort((a, b) => {
          const dateA = a.createdAt?.getTime() ?? 0;
          const dateB = b.createdAt?.getTime() ?? 0;
          return dateB - dateA; // ⬆️ Nyast först
        });

      this.programs.set(programs);
    });
  }

  async addProgram(program: CreateProgramInput) {
    const colRef = getProgramCollection(this.firestore);
    await addDoc(colRef, {
      ...program,
      createdAt: serverTimestamp(),
    });
  }

  async updateProgram(id: string, updates: Partial<Program>) {
    const docRef = getProgramDoc(this.firestore, id);
    await updateDoc(docRef, updates);
  }

  async deleteProgram(id: string) {
    const docRef = getProgramDoc(this.firestore, id);
    await deleteDoc(docRef);
  }

  stopTrainingProgramsListener() {
    if (this.unsubscribe) this.unsubscribe();
  }
}

function parseProgramDoc(doc: DocumentData, id: string): Program | null {
  const workoutName = doc['workoutName'];
  if (typeof workoutName !== 'string') {
    console.warn(`⚠️ Ogiltigt dokument: ${id}`, doc);
    return null;
  }

  let createdAt: Date | undefined;
  const rawCreatedAt = doc['createdAt'];

  if (rawCreatedAt instanceof Timestamp) {
    createdAt = rawCreatedAt.toDate();
  } else if (rawCreatedAt instanceof Date) {
    createdAt = rawCreatedAt;
  }

  return {
    id,
    workoutName,
    duration: typeof doc['duration'] === 'number' ? doc['duration'] : undefined,
    type: typeof doc['type'] === 'string' ? doc['type'] : undefined,
    createdAt,
  };
}
