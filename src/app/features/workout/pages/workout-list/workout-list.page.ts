import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Program } from 'src/app/shared/models/program.model';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.page.html',
  styleUrls: ['./workout-list.page.scss'],
  standalone: false,
})
export class WorkoutListPage implements OnDestroy {
  /**
   * Signal som innehåller aktuella träningsprogram
   */
  workouts = this.programService.programs;

  constructor(
    private programService: ProgramService,
    private router: Router
  ) {
    this.programService.initTrainingProgramListener();
  }

  ngOnDestroy(): void {
    this.programService.stopTrainingProgramsListener();
  }

  /**
   * Navigerar till workout-detaljsidan för valt program
   * @param id ID för det träningsprogram som ska visas
   */
  goToWorkout(id: string | undefined): void {
    if (!id) return;
    this.router.navigate(['/workout', id]);
  }

  /**
   * Raderar ett träningsprogram via dess ID
   * @param id ID för det träningsprogram som ska tas bort
   */
  deleteWorkout(id: string | undefined): void {
    if (!id) return;
    this.programService.deleteProgram(id);
  }
}
