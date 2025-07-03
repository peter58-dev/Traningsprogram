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
}
