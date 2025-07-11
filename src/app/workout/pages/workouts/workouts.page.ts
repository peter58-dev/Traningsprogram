import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/shared/services/program.service';
import { AddWorkoutComponent } from '../../components/add-workout/add-workout.component';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
  standalone: false,
})
export class WorkoutsPage implements OnDestroy {
  programs = this.workoutService.programs;

  constructor(
    private workoutService: ProgramService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) {}

  ngOnDestroy(): void {
    this.workoutService.stopTrainingProgramsListener();
  }

  async showProgramSavedToast() {
    const toast = await this.toastCtrl.create({
      message: 'Program tillagt!',
      duration: 1200,
      position: 'middle',
      cssClass: 'green-toast',
    });
    await toast.present();
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

    if (role === 'confirm' && data) {
      try {
        await this.workoutService.addProgram(data);
        await this.showProgramSavedToast();
      } catch (error) {
        console.error('Error saving program to Firestore:', error);
      }
    }
  }

  deleteWorkout(id: string) {
    this.workoutService.deleteProgram(id);
  }
}
