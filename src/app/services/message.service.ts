import { Injectable, signal } from '@angular/core';
import { Message } from '../models/message.model';

import { Firestore, collection, getDocs, addDoc, Timestamp } from '@angular/fire/firestore';
import { collection as fsCollection, getDocs as fsGetDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  meddelanden = signal<Message[]>([]);
  loading = signal(false);
  constructor(private fireStore: Firestore) {}

  async getAllMsg() {
    this.loading.set(true);
    const col = fsCollection(this.fireStore, 'messages');
    const snapshot = await fsGetDocs(col);
    const data = snapshot.docs.map((doc) => doc.data() as Message);
    this.meddelanden.set(data);
    this.loading.set(false);
  }

  async addMessage(content: string) {
    const ref = collection(this.fireStore, 'messages');
    await addDoc(ref, {
      content,
      createdAt: Timestamp.now(),
    });
    await this.getAllMsg(); //Automatiskt uppdatera listan!
  }
}
