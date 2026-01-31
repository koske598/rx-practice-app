import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/exercise-page/exercise-page.component').then(m => m.ExercisePageComponent)
  }
];
