import { Component, OnInit, signal } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { collection as fsCollection, getDocs as fsGetDocs } from 'firebase/firestore';

import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  standalone: false,
})
export class MessageListComponent implements OnInit {
  meddelanden = signal<Message[]>([]);
  loading = signal(true);
  constructor(private fireStore: Firestore) {}

  ngOnInit() {
    this.loadMessagesOnce();
  }

  async loadMessagesOnce() {
    const col = fsCollection(this.fireStore, 'messages');
    const snapshot = await fsGetDocs(col);

    const data = snapshot.docs.map((doc) => doc.data() as Message);
    this.meddelanden.set(data);
    this.loading.set(false);
  }
}
