import { Routes } from '@angular/router';
import { Overview } from './features/overview/overview';
import { Game } from './features/game/game';

export const routes: Routes = [
  {
    path: '',
    component: Overview,
  },
  {
    path: 'game',
    component: Game,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
