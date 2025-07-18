import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramService } from 'src/app/shared/services/program.service';
import { Program } from '../../../../shared/models/program.model';
import { IonHeader } from '@ionic/angular/standalone';

@Component({
  selector: 'app-selected-workout',
  templateUrl: './selected-workout.page.html',
  styleUrls: ['./selected-workout.page.scss'],
  standalone: false,
})
export class SelectedWorkoutPage implements OnInit {
  workoutId: string | undefined;
  workout: Program | undefined;

  constructor(
    private programService: ProgramService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.workoutId = this.route.snapshot.paramMap.get('id')!;

    // Hämta program från service (som håller alla program i en signal)
    const programs = this.programService.programs();
    this.workout = programs.find((p) => p.id === this.workoutId);
  }
}
