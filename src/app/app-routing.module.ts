import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
