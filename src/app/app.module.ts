import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';


import { MyApp } from './app.component';

//pages
import { HomePage } from '../pages/home/home';
import { TrovaRipetizioniPage } from '../pages/trova-ripetizioni/trova-ripetizioni';
import { RegistrazionePage } from '../pages/registrazione/registrazione';
import { LoginPage } from '../pages/login/login';
import { MioProfiloPage } from '../pages/mio-profilo/mio-profilo';
//providers
import { CategoriaProvider } from '../providers/categoria/categoria.provider';
import { MateriaProvider } from '../providers/materia/materia.provider';
import { RipetizioneProvider } from '../providers/ripetizione/ripetizione.provider';
import { UtenteProvider } from '../providers/utente/utente.provider';

//custom pipes
import { CapitalizePipe } from '../pipes/capitalize.pipes'; // import our pipe here
import { SurnamePipe } from '../pipes/surname.pipes';
import { AgePipe } from '../pipes/age.pipes';
import { AccountProvider } from '../providers/account/account.provider';
import { UserPersistanceProvider } from '../providers/userpersistance/userpersistance.provider';
import { MioprofiloProvider } from '../providers/mioprofilo/mioprofilo.provider';
import { PointofwordPipe } from '../pipes//pointofword.pipes';
import { EtàPipe } from '../pipes/età.pipes';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TrovaRipetizioniPage,
    RegistrazionePage,
    MioProfiloPage,
    LoginPage,
    CapitalizePipe,
    SurnamePipe,
    AgePipe,
    PointofwordPipe,
    EtàPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  exports: [
      CapitalizePipe,
      SurnamePipe,
      AgePipe
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TrovaRipetizioniPage,
    RegistrazionePage,
    LoginPage,
    MioProfiloPage
      ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaProvider,
    MateriaProvider,
    RipetizioneProvider,
    UtenteProvider,
    AccountProvider,
    UserPersistanceProvider,
    MioprofiloProvider
  ]
})
export class AppModule {}
