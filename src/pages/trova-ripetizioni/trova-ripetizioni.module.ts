import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrovaRipetizioniPage } from './trova-ripetizioni';


@NgModule({
  declarations: [
    TrovaRipetizioniPage
  ],
  imports: [
    IonicPageModule.forChild(TrovaRipetizioniPage),

  ],
  exports: [
    TrovaRipetizioniPage
  ]
})
export class TrovaRipetizioniPageModule {}
