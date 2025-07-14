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
export class ExerciseService {
  // ============================================================
  // 🧠 SIGNALER & FÄLT
  // ============================================================

  /** Signal som innehåller aktuell lista över övningar */
  public readonly exercises = signal<Exercise[]>([]);

  /** Funktion för att avsluta snapshot-lyssnaren */
  private unsubscribe: (() => void) | undefined;

  constructor(private fireStore: Firestore) {}

  // ============================================================
  // 🔄 LIVSCYKEL & LYSSNARE
  // ============================================================

  /**
   * Startar realtidslyssnare på 'exercises'-kollektionen i Firestore.
   * Uppdaterar signalen automatiskt vid databasändringar.
   */
  public initExerciseListener(): void {
    const colRef = collection(this.fireStore, 'exercises');
    try {
      this.unsubscribe = onSnapshot(colRef, (snapshot) => {
        const exercises = snapshot.docs
          .map((doc) => parseExerciseDoc(doc.data(), doc.id))
          .filter((ex): ex is Exercise => ex !== null);
        this.exercises.set(exercises);
      });
    } catch (err) {
      console.error('Fel vid initiering av övningslyssnare:', err);
    }
  }

  /**
   * Stoppar lyssnaren, används i t.ex. ngOnDestroy för att undvika minnesläckor.
   */
  public stopExerciseListener(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = undefined;
    }
  }

  // ============================================================
  // ✍️ CRUD-METODER
  // ============================================================

  /**
   * Lägger till en ny övning i Firestore.
   * @param exercise Övning utan ID.
   */
  public async addExercise(exercise: Omit<Exercise, 'id'>): Promise<void> {
    try {
      const colRef = collection(this.fireStore, 'exercises');
      await addDoc(colRef, exercise);
    } catch (err) {
      console.error('Fel vid tillägg av övning:', err);
    }
  }

  /**
   * Uppdaterar övningens namn baserat på ID.
   * @param id Dokumentets Firestore-ID.
   * @param name Nytt övningsnamn.
   */
  public async updateExerciseName(id: string, name: string): Promise<void> {
    try {
      const docRef = doc(this.fireStore, 'exercises', id);
      await updateDoc(docRef, { exerciseName: name });
    } catch (err) {
      console.error('Fel vid uppdatering av övningsnamn:', err);
    }
  }

  /**
   * Tar bort en övning från Firestore.
   * @param id Firestore-ID för dokumentet som ska raderas.
   */
  public async deleteExercise(id: string): Promise<void> {
    try {
      const docRef = doc(this.fireStore, 'exercises', id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error('Fel vid borttagning av övning:', err);
    }
  }
}

// ============================================================
// 🧪 HJÄLPMETOD – PARSA FIRESTORE-DOKUMENT
// ============================================================

/**
 * Tolkar Firestore-dokument till ett Exercise-objekt.
 * Validerar datan och filtrerar bort felaktiga poster.
 *
 * @param doc Rådata från Firestore
 * @param id Dokumentets ID
 * @returns Exercise eller null om datan är ogiltig
 */
function parseExerciseDoc(doc: DocumentData, id: string): Exercise | null {
  const name = doc['exerciseName'];
  const sets = Array.isArray(doc['sets']) ? doc['sets'] : [];

  if (typeof name !== 'string') {
    console.warn(`Ogiltigt dokument: ${id}`, doc);
    return null;
  }

  return {
    id,
    exerciseName: name,
    sets,
  };
}
