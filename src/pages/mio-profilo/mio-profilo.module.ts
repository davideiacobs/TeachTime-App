import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MioProfiloPage } from './mio-profilo';

@NgModule({
  declarations: [
    MioProfiloPage,
  ],
  imports: [
    IonicPageModule.forChild(MioProfiloPage),
  ],
  exports: [
    MioProfiloPage
  ]
})
export class MioProfiloPageModule {}
