import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipes';

@NgModule({
  declarations: [
    CapitalizePipe,
  ],
  exports: [
    CapitalizePipe,
  ]
})
export class CapitalizePipeModule {}
