import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { AddWorkoutComponent } from '../workout/components/add-workout/add-workout.component';
import { ProgramService } from '../shared/services/program.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(
    private modalCtrl: ModalController,
    private workoutService: ProgramService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async showProgramSavedToast() {
    const toast = await this.toastCtrl.create({
      message: 'Program tillagt!',
      duration: 1200,
      position: 'middle',
      cssClass: 'green-toast',
    });

    await toast.present();

    // Vänta på att toasten försvinner
    return toast.onDidDismiss();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddWorkoutComponent,
      backdropDismiss: true,
      cssClass: 'modal-home',
    });

    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      try {
        await this.workoutService.addProgram(data);
        console.log('Program saved to Firestore');

        await this.showProgramSavedToast(); // Vänta toasten klart

        this.router.navigate(['/workouts']); // Navigera EFTER toasten är klar
      } catch (error) {
        console.error('Error saving program to Firestore:', error);
      }
    }
  }

  showWorkoutsList() {
    console.log('lista visas');
  }
}
