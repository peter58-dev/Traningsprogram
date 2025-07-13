import { Injectable, signal } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private readonly userId = 'devUser'; // använd en fast ID tills auth är på plats

  constructor(private fireStore: Firestore) {}

  // Signal som håller senaste sparade URL
  lastVisitedUrl = signal<string | null>(null);

  async saveLastVisitedUrl(url: string) {
    console.log('Sparar till Firestore:', url);
    const docRef = doc(this.fireStore, `appState/${this.userId}`);
    await setDoc(docRef, { lastVisitedUrl: url }, { merge: true });
  }

  async loadLastVisitedUrl(): Promise<string | null> {
    const docRef = doc(this.fireStore, `appState/${this.userId}`);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    const url = data?.['lastVisitedUrl'] ?? null;

    console.log('Laddad URL:', url); // 👈 Här kan du lägga loggning om du vill

    this.lastVisitedUrl.set(url); // Uppdaterar din signal
    return url; // ✅ Returnera resultatet
  }
}
