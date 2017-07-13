import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MioProfiloPage } from './mio-profilo';
//pipes
import {AgePipeModule} from '../../pipes/age.module';
import {CapitalizePipeModule} from '../../pipes/capitalize.module';
import {SurnamePipeModule} from '../../pipes/surname.module';

@NgModule({
  declarations: [
    MioProfiloPage,
  ],
  imports: [
    IonicPageModule.forChild(MioProfiloPage),
    AgePipeModule,
    CapitalizePipeModule,
    SurnamePipeModule
  ],
  exports: [
    MioProfiloPage,
  ]
})
export class MioProfiloPageModule {}
