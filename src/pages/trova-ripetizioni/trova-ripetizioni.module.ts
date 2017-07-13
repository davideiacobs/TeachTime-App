import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrovaRipetizioniPage } from './trova-ripetizioni';
//pipes
import {AgePipeModule} from '../../pipes/age.module';
import {CapitalizePipeModule} from '../../pipes/capitalize.module';
import {SurnamePipeModule} from '../../pipes/surname.module';

@NgModule({
  declarations: [
    TrovaRipetizioniPage
  ],
  imports: [
    IonicPageModule.forChild(TrovaRipetizioniPage),
    AgePipeModule,
    CapitalizePipeModule,
    SurnamePipeModule
  ],
  exports: [
    TrovaRipetizioniPage
  ]
})
export class TrovaRipetizioniPageModule {}
