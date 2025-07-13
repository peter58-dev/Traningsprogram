import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutSessionPageRoutingModule } from './workout-session-routing.module';

import { WorkoutSessionPage } from './workout-session.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, WorkoutSessionPageRoutingModule],
  declarations: [WorkoutSessionPage],
})
export class WorkoutSessionPageModule {}
