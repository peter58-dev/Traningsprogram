import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
  standalone: false,
})
export class WorkoutsPage implements OnInit, OnDestroy {
  programs = this.workoutService.programs;

  constructor(private workoutService: ProgramService) {}

  ngOnInit(): void {
    this.workoutService.initTrainingProgramListener();
  }

  deleteWorkout(id: string) {
    this.workoutService.deleteProgram(id);
  }

  ngOnDestroy(): void {
    this.workoutService.stopTrainingProgramsListener();
  }
}
