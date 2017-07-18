import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OffriRipetizionePage } from './offri-ripetizione';

@NgModule({
  declarations: [
    OffriRipetizionePage,
  ],
  imports: [
    IonicPageModule.forChild(OffriRipetizionePage),
  ],
  exports: [
    OffriRipetizionePage
  ]
})
export class OffriRipetizionePageModule {}
