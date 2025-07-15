import {
  CollectionReference,
  DocumentReference,
  Firestore,
  collection,
  doc,
} from '@angular/fire/firestore';
import { Program } from '../models/program.model';
import { Exercise } from '../models/exercise.model';
import { ExerciseSet } from '../models/set.model';

// 🔹 DocRef: Enskilt program
export function getProgramDoc(firestore: Firestore, programId: string): DocumentReference<Program> {
  return doc(firestore, `trainingPrograms/${programId}`) as DocumentReference<Program>;
}

// 🔹 Collection: Alla programs
export function getProgramCollection(firestore: Firestore): CollectionReference<Program> {
  return collection(firestore, 'trainingPrograms') as CollectionReference<Program>;
}

// 🔹 Collection: Exercises i ett program
export function getExerciseCollection(
  firestore: Firestore,
  programId: string
): CollectionReference<Exercise> {
  return collection(
    firestore,
    `trainingPrograms/${programId}/exercises`
  ) as CollectionReference<Exercise>;
}

// 🔹 DocRef: Enskild exercise
export function getExerciseDoc(
  firestore: Firestore,
  programId: string,
  exerciseId: string
): DocumentReference<Exercise> {
  return doc(
    firestore,
    `trainingPrograms/${programId}/exercises/${exerciseId}`
  ) as DocumentReference<Exercise>;
}

// 🔹 Collection: Sets i en exercise
export function getSetCollection(
  firestore: Firestore,
  programId: string,
  exerciseId: string
): CollectionReference<ExerciseSet> {
  return collection(
    firestore,
    `trainingPrograms/${programId}/exercises/${exerciseId}/sets`
  ) as CollectionReference<ExerciseSet>;
}

// 🔹 DocRef: Enskilt set
export function getSetDoc(
  firestore: Firestore,
  programId: string,
  exerciseId: string,
  setId: string
): DocumentReference<ExerciseSet> {
  return doc(
    firestore,
    `trainingPrograms/${programId}/exercises/${exerciseId}/sets/${setId}`
  ) as DocumentReference<ExerciseSet>;
}
