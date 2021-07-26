import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {CoreModule} from '../../core.module';
import SubHeaderComponent from './sub-header.component';

@NgModule({
  declarations: [SubHeaderComponent],
  imports:      [CoreModule,
    FormsModule,
    ReactiveFormsModule,],
  exports:      [SubHeaderComponent]
})
export default class SubHeaderModule {

}
