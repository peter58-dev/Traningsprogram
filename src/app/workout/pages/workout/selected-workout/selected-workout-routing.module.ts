import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedWorkoutPage } from './selected-workout.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedWorkoutPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedWorkoutPageRoutingModule {}
