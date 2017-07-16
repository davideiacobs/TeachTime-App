import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificaProfiloPage } from './modifica-profilo';

@NgModule({
  declarations: [
    ModificaProfiloPage,
  ],
  imports: [
    IonicPageModule.forChild(ModificaProfiloPage),
  ],
  exports: [
    ModificaProfiloPage
  ]
})
export class ModificaProfiloPageModule {}
