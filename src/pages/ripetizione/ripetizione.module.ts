import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RipetizionePage } from './ripetizione';

@NgModule({
  declarations: [
    RipetizionePage,
  ],
  imports: [
    IonicPageModule.forChild(RipetizionePage),
  ],
  exports: [
    RipetizionePage
  ]
})
export class RipetizionePageModule {}
