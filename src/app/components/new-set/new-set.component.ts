import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-new-set',
  templateUrl: './new-set.component.html',
  styleUrls: ['./new-set.component.scss'],
  standalone: false,
})
export class NewSetComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  private workoutService = inject(WorkoutService);
  @Input() exerciseId: string | undefined;

  constructor() {}

  ngOnInit() {}
  newSetForm = signal(
    this.fb.group({
      sets: this.fb.array([
        this.fb.group({
          setNumber: [1],
          weight: ['', Validators.required],
          discs: [''],
          reps: ['', Validators.required],
        }),
      ]),
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
