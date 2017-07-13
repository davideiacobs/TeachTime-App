import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

//providers
import { CategoriaProvider } from '../providers/categoria/categoria.provider';
import { MateriaProvider } from '../providers/materia/materia.provider';
import { RipetizioneProvider } from '../providers/ripetizione/ripetizione.provider';
import { UtenteProvider } from '../providers/utente/utente.provider';
import { AccountProvider } from '../providers/account/account.provider';
import { UserPersistanceProvider } from '../providers/userpersistance/userpersistance.provider';

//custom pipes
import { CapitalizePipeModule } from '../pipes/capitalize.module'; // import our pipe here
import { SurnamePipeModule } from '../pipes/surname.module';
import {AgePipeModule} from '../pipes/age.module';

//pages
import {TrovaRipetizioniPage} from '../pages/trova-ripetizioni/trova-ripetizioni';
import {HomePage} from '../pages/home/home';
import { LoginPage } from '../pages//login/login';


@NgModule({
  declarations: [
    MyApp,
    TrovaRipetizioniPage,
    LoginPage
    ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgePipeModule,
    CapitalizePipeModule,
    SurnamePipeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TrovaRipetizioniPage,
    LoginPage
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
    UserPersistanceProvider
  ]
})
export class AppModule {}
