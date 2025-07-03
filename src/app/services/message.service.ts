import { Injectable, signal } from '@angular/core';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  meddelanden = signal<Message[]>([]);
  loading = signal(false);
  constructor() {}
}
