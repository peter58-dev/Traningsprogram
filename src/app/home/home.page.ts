import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
    private router: Router
  ) {}

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
        await this.workoutService.addProgram(data); // 🧠 detta triggar din listener automatiskt
        console.log('Program saved to Firestore');

        // ✅ Navigera till "lista"-sidan efter att programmet sparats
        this.router.navigate(['/workouts']);
      } catch (error) {
        console.error('Error saving program to Firestore:', error);
      }
    }
  }

  showWorkoutsList() {
    console.log('lista visas');
  }
}
