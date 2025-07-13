import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutSessionPage } from './workout-session.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutSessionPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutSessionPageRoutingModule {}
