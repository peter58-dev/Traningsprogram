import { Component, OnInit } from '@angular/core';

import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  standalone: false,
})
export class MessageListComponent implements OnInit {
  constructor(public msgService: MessageService) {}

  ngOnInit(): void {
    this.msgService.getAllMsg(); // laddar initialt
  }

  get meddelanden() {
    return this.msgService.meddelanden;
  }

  get loading() {
    return this.msgService.loading;
  }
}
