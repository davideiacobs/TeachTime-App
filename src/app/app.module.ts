import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';

//pages
import { HomePage } from '../pages/home/home';
import { TrovaRipetizioniPage } from '../pages/trova-ripetizioni/trova-ripetizioni'

//providers
import { CategoriaProvider } from '../providers/categoria/categoria.provider';
import { MateriaProvider } from '../providers/materia/materia.provider';
import { RipetizioneProvider } from '../providers/ripetizione/ripetizione.provider';
import { UtenteProvider } from '../providers/utente/utente.provider';

//custom pipes
import { CapitalizePipe } from '../pipes/capitalize.pipes'; // import our pipe here
import { SurnamePipe } from '../pipes/surname.pipes';
import { AgePipe } from '../pipes/age.pipes';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TrovaRipetizioniPage,
    CapitalizePipe,
    SurnamePipe,
    AgePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TrovaRipetizioniPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaProvider,
    MateriaProvider,
    RipetizioneProvider,
    UtenteProvider
  ]
})
export class AppModule {}
