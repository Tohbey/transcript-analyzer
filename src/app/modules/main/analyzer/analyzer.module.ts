import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

import { CoreModule } from 'src/app/core/core.module';

import AnalyzerComponent from './analyzer.component';

@NgModule({
    declarations: [ AnalyzerComponent ],
    imports: [
        CoreModule,
        ReactiveFormsModule,
        MatTooltipModule
    ],
    exports:[AnalyzerComponent]
})
export class AnalyzerModule {}
