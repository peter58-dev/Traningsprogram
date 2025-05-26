import { Component, OnInit, inject } from '@angular/core';
import { WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  workoutService = inject(WorkoutService);
  id!: string;

  constructor() {}

  async ngOnInit() {
    await this.workoutService.loadWorkouts();
  }

  async delete(id: string) {
    await this.workoutService.deleteExercise(id);
  }

  addNewWorkout() {
    console.log('CLICKAD!');
  }
}
