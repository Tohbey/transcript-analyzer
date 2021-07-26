import { Routes } from '@angular/router';

import MainComponent from './modules/main/main.component';

export const ROUTES: Routes = [{
  path: '',
  pathMatch: 'full',
  component: MainComponent,
  loadChildren: () => import('./modules/main/main.module')
    .then(m => m.MainModule).catch(e => console.error(e))
}];
