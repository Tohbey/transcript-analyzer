import { Routes } from '@angular/router';

import AnalyzerComponent from './analyzer/analyzer.component';

export const ROUTES: Routes = [{
    path: 'analyzer',
    component: AnalyzerComponent,
    loadChildren: () => import('./analyzer/analyzer.module')
        .then(m => m.AnalyzerModule)
}];
