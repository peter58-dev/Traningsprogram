import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AddProgramComponent } from '../components/add-program/add-program.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private modalCtrl: ModalController) {}

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddProgramComponent,
      backdropDismiss: true,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'save' && data) {
      console.log('Nytt pass:', data);
      // Add to your signal, list or storage
    }
  }

  showWorkoutsList() {
    console.log('lista visas');
  }
}
