import { Component, OnDestroy, OnInit } from '@angular/core';
import { Program } from 'src/app/shared/models/program.model';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.page.html',
  styleUrls: ['./workout-list.page.scss'],
  standalone: false,
})
export class WorkoutListPage implements OnDestroy {
  workouts = this.programService.programs;

  constructor(private programService: ProgramService) {
    this.programService.initTrainingProgramListener();
  }

  ngOnDestroy(): void {
    this.programService.stopTrainingProgramsListener();
  }

  deleteWorkout(id: string) {
    this.programService.deleteProgram(id);
  }
}
