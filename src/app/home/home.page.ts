import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AddWorkoutComponent } from '../workout/components/add-workout/add-workout.component';

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
      component: AddWorkoutComponent,
      backdropDismiss: true,
      cssClass: 'modal-home',
    });

    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      // Hantera data här, t.ex. spara till Firestore
      console.log('Modal confirmed with data:', data);
    }
  }

  showWorkoutsList() {
    console.log('lista visas');
  }
}
