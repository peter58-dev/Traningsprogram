import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedWorkoutPageRoutingModule } from './selected-workout-routing.module';

import { SelectedWorkoutPage } from './selected-workout.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SelectedWorkoutPageRoutingModule],
  declarations: [SelectedWorkoutPage],
})
export class SelectedWorkoutPageModule {}
