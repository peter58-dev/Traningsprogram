import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'workouts',
    loadChildren: () =>
      import('./workout/pages/workouts/workouts.module').then((m) => m.WorkoutsPageModule),
  },
  {
    path: 'selected-workout/:id',
    loadChildren: () =>
      import('./workout/pages/workout/selected-workout/selected-workout.module').then(
        (m) => m.SelectedWorkoutPageModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
  },
  {
    path: 'workout-session',
    loadChildren: () =>
      import('./features/workout/pages/workout-session/workout-session.module').then(
        (m) => m.WorkoutSessionPageModule
      ),
  },
  {
    path: 'test-page',
    loadChildren: () =>
      import('./for-testing/pages/test-page/test-page.module').then((m) => m.TestPagePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
