import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

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
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.newMessageForm = this.fb.group({
      meddelande: ['', Validators.required],
    });
  }
}
