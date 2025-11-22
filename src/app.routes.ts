import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    pathMatch: 'full'
  },
  {
    path: 'builder',
    loadComponent: () => import('./pages/builder/builder.component').then(m => m.BuilderComponent)
  },
  { path: '**', redirectTo: '' }
];
