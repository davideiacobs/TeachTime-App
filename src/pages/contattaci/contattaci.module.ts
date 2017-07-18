import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContattaciPage } from './contattaci';

@NgModule({
  declarations: [
    ContattaciPage,
  ],
  imports: [
    IonicPageModule.forChild(ContattaciPage),
  ],
  exports: [
    ContattaciPage
  ]
})
export class ContattaciPageModule {}
