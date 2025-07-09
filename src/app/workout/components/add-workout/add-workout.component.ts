import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonHeader } from '@ionic/angular/standalone';
import { ProgramService } from '../../../shared/services/program.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { Program } from '../../models/workout.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class AddWorkoutComponent implements OnInit {
  newWorkoutForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private programService: ProgramService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.newWorkoutForm = this.fb.group({
      workoutName: ['', Validators.required],
    });
  }

  async saveProgram() {
    if (this.newWorkoutForm.invalid) {
      return;
    }

    const newProgram: Omit<Program, 'id'> = {
      workoutName: this.newWorkoutForm.value.workoutName,
      createdAt: new Date(),
    };

    try {
      await this.modalCtrl.dismiss(newProgram, 'confirm');
    } catch (error) {
      console.error('Error dismissing modal:', error);
    }
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
