import { Injectable, signal } from '@angular/core';
import {
  Firestore,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
} from '@angular/fire/firestore';
import { ExerciseSet } from '../models/set.model';
import { getSetCollection, getSetDoc } from '../firestore-utils/firestore-paths';

@Injectable({ providedIn: 'root' })
export class SetService {
  readonly sets = signal<ExerciseSet[]>([]);
  private unsubscribe: (() => void) | undefined;

  constructor(private firestore: Firestore) {}

  initSetListener(programId: string, exerciseId: string) {
    const colRef = getSetCollection(this.firestore, programId, exerciseId);
    this.unsubscribe = onSnapshot(colRef, (snapshot) => {
      const sets = snapshot.docs
        .map((doc) => parseSetDoc(doc.data(), doc.id))
        .filter((set): set is ExerciseSet => set !== null);
      this.sets.set(sets);
    });
  }

  async addSet(programId: string, exerciseId: string, setData: Omit<ExerciseSet, 'id'>) {
    const colRef = getSetCollection(this.firestore, programId, exerciseId);
    await addDoc(colRef, setData);
  }

  async updateSet(
    programId: string,
    exerciseId: string,
    setId: string,
    updates: Partial<ExerciseSet>
  ) {
    const docRef = getSetDoc(this.firestore, programId, exerciseId, setId);
    await updateDoc(docRef, updates);
  }

  async deleteSet(programId: string, exerciseId: string, setId: string) {
    const docRef = getSetDoc(this.firestore, programId, exerciseId, setId);
    await deleteDoc(docRef);
  }

  stopSetListener() {
    if (this.unsubscribe) this.unsubscribe();
  }
}

function parseSetDoc(doc: DocumentData, id: string): ExerciseSet | null {
  const set = typeof doc['set'] === 'number' ? doc['set'] : undefined;
  const reps = typeof doc['reps'] === 'number' ? doc['reps'] : undefined;
  const weight = typeof doc['weight'] === 'number' ? doc['weight'] : undefined;

  if (set === undefined || reps === undefined || weight === undefined) {
    console.warn(`⚠️ Ogiltigt set: ${id}`, doc);
    return null;
  }

  return { set, reps, weight };
}
