import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrenotatiPage } from './prenotati';

@NgModule({
  declarations: [
    PrenotatiPage,
  ],
  imports: [
    IonicPageModule.forChild(PrenotatiPage),
  ],
  exports: [
    PrenotatiPage
  ]
})
export class PrenotatiPageModule {}
