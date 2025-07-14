import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonContent, IonInput, IonButton } from '@ionic/angular/standalone';

/**
 * Testmodal med lokal layout
 */
@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonContent],
})
export class TestModalComponent {
  @Input() title: string = 'Test Modal';
  @Input() heightClass: string = 'h-md'; // Ex: 'h-sm', 'h-lg'
  @Input() colorClass: string = 'c-primary'; // Ex: 'c-warning'

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }

  get modalClasses(): string[] {
    return [this.heightClass, this.colorClass];
  }
}
