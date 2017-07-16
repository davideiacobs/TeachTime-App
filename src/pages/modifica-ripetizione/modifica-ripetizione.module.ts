import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificaRipetizionePage } from './modifica-ripetizione';

@NgModule({
  declarations: [
    ModificaRipetizionePage,
  ],
  imports: [
    IonicPageModule.forChild(ModificaRipetizionePage),
  ],
  exports: [
    ModificaRipetizionePage
  ]
})
export class ModificaRipetizionePageModule {}
