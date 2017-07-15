import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RilasciaFeedbackPage } from './rilascia-feedback';
//pipes
import {CapitalizePipeModule} from '../../pipes/capitalize.module';
import {SurnamePipeModule} from '../../pipes/surname.module';

@NgModule({
  declarations: [
    RilasciaFeedbackPage,
  ],
  imports: [
        IonicPageModule.forChild(RilasciaFeedbackPage),
        CapitalizePipeModule,
        SurnamePipeModule
  ],
  exports: [
    RilasciaFeedbackPage
  ]
})
export class RilasciaFeedbackPageModule {}
