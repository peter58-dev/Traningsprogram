import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonButton, IonIcon, IonicModule } from '@ionic/angular';

import { WorkoutsPageRoutingModule } from './workouts-routing.module';

import { WorkoutsPage } from './workouts.page';

// <-- Glöm inte att importera modulen här:
import { AddWorkoutModule } from '../../components/add-workout/add-workout.module';
import { DeleteButtonComponent } from 'src/app/shared/components/delete-button.component';

@NgModule({
  declarations: [WorkoutsPage],
  imports: [
    CommonModule,
    IonicModule,

    AddWorkoutModule, // Nu funkar det, eftersom modulen är importerad
    WorkoutsPageRoutingModule, // glöm inte routingmodulen!
    FormsModule, // viktigt om du använder formulär,
    DeleteButtonComponent,
  ],
})
export class WorkoutsPageModule {}
