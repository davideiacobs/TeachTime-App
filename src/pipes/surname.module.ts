import { NgModule } from '@angular/core';
import { SurnamePipe } from './surname.pipes';

@NgModule({
  declarations: [
    SurnamePipe,
  ],
  exports: [
    SurnamePipe,
  ]
})
export class SurnamePipeModule {}
