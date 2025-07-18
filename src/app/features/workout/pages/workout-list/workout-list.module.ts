import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutListPageRoutingModule } from './workout-list-routing.module';

import { WorkoutListPage } from './workout-list.page';
import { DeleteButtonComponent } from 'src/app/shared/components/delete-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutListPageRoutingModule,
    DeleteButtonComponent,
  ],
  declarations: [WorkoutListPage],
})
export class WorkoutListPageModule {}
