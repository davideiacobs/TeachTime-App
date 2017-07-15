import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InserisciFeedbackPage } from './inseriscifeedback';
//pipes
import {CapitalizePipeModule} from '../../pipes/capitalize.module';
import {SurnamePipeModule} from '../../pipes/surname.module';

@NgModule({
  declarations: [
    InserisciFeedbackPage
  ],
  imports: [
    IonicPageModule.forChild(InserisciFeedbackPage),
    CapitalizePipeModule,
    SurnamePipeModule
  ],
  exports: [
    InserisciFeedbackPage
  ]
})
export class InserisciFeedbackPageModule {}
