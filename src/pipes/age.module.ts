import { NgModule } from '@angular/core';
import { AgePipe } from './age.pipes';

@NgModule({
  declarations: [
    AgePipe,
  ],
  exports: [
    AgePipe,
  ]
})
export class AgePipeModule {}
