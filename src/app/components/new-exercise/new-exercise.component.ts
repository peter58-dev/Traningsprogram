import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { WorkoutService } from '../../services/workout.service';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-new-exercise',
  standalone: false,
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss'],
})
export class NewExerciseComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  private workoutService = inject(WorkoutService);

  constructor() {}

  ngOnInit() {}
  newExerciseForm = signal(
    this.fb.group({
      exerciseName: ['', Validators.required],
    })
  );
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.newExerciseForm().valid) {
      this.modalCtrl.dismiss(
        {
          exerciseName: this.newExerciseForm().value.exerciseName,
        },
        'confirm'
      );
    }
  }
}
