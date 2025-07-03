import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
  standalone: false,
})
export class MessageFormComponent implements OnInit {
  newMessageForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private msgService: MessageService
  ) {}

  ngOnInit(): void {
    this.newMessageForm = this.fb.group({
      meddelande: ['', Validators.required],
    });
  }

  async spara() {
    if (this.newMessageForm.invalid) return;
    const msg = this.newMessageForm.value.meddelande;
    await this.msgService.addMessage(msg);
    this.modalCtrl.dismiss(null, 'success');
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
