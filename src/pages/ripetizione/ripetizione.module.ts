import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RipetizionePage } from './ripetizione';
//pipes
import {AgePipeModule} from '../../pipes/age.module';
import {CapitalizePipeModule} from '../../pipes/capitalize.module';
import {SurnamePipeModule} from '../../pipes/surname.module';



@NgModule({
  declarations: [
    RipetizionePage,  
  ],
  imports: [
    IonicPageModule.forChild(RipetizionePage),
    AgePipeModule,
    CapitalizePipeModule,
    SurnamePipeModule
  ],
  exports: [
    RipetizionePage
  ]
})
export class RipetizionePageModule {}
