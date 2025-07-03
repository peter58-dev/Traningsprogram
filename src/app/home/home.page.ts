import { Component, signal } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MessageFormComponent } from '../components/message-form/message-form.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  visaMeddelanden = signal(false);
  constructor(private modalCtrl: ModalController) {}

  toggleMeddelanden() {
    this.visaMeddelanden.update((value: boolean) => !value);
  }

  async openNewMessModal() {
    const modal = await this.modalCtrl.create({
      component: MessageFormComponent,
    });
    modal.present();
  }
}
