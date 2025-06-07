import { Component, OnInit, inject } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { ModalController } from '@ionic/angular';
import { NewExerciseComponent } from '../components/new-exercise/new-exercise.component';
import { NewSetComponent } from '../components/new-set/new-set.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  workoutService = inject(WorkoutService);
  private ctrlModal = inject(ModalController);

  id!: string;

  constructor() {}

  async ngOnInit() {
    await this.workoutService.loadWorkouts();
  }

  async openNewExercise() {
    const modal = await this.ctrlModal.create({
      component: NewExerciseComponent,
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data?.exerciseName) {
      // await this.workoutService.addNewExercise(data.exerciseName);
    }
  }

  async delete(id: string) {
    // await this.workoutService.deleteExercise(id);
  }

  addNewWorkout() {
    console.log('CLICKAD!');
  }
  async openNewSet(exerciseId: string) {
    const modal = await this.ctrlModal.create({
      component: NewSetComponent,
      componentProps: { exerciseId },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data?.newSet) {
      // await this.workoutService.addSet(exerciseId, data.newSet);
    }
  }
}
