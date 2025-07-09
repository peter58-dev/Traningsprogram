import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutsPageRoutingModule } from './workouts-routing.module';

import { WorkoutsPage } from './workouts.page';

// <-- Glöm inte att importera modulen här:
import { AddWorkoutModule } from '../../components/add-workout/add-workout.module';

@NgModule({
  declarations: [WorkoutsPage],
  imports: [
    CommonModule,
    IonicModule,
    AddWorkoutModule, // Nu funkar det, eftersom modulen är importerad
    WorkoutsPageRoutingModule, // glöm inte routingmodulen!
    FormsModule, // viktigt om du använder formulär
  ],
})
export class WorkoutsPageModule {}
