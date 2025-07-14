import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutSessionPageRoutingModule } from './workout-session-routing.module';

import { WorkoutSessionPage } from './workout-session.page';
import { ExerciseModalComponent } from 'src/app/features/modals/exercise-modal/exercise-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, WorkoutSessionPageRoutingModule],
  declarations: [WorkoutSessionPage, ExerciseModalComponent],
})
export class WorkoutSessionPageModule {}
