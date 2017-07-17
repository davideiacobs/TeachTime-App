import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { DatePipe } from '@angular/common';

//providers
import { CategoriaProvider } from '../providers/categoria/categoria.provider';
import { MateriaProvider } from '../providers/materia/materia.provider';
import { RipetizioneProvider } from '../providers/ripetizione/ripetizione.provider';
import { UtenteProvider } from '../providers/utente/utente.provider';
import { AccountProvider } from '../providers/account/account.provider';
import { UserPersistanceProvider } from '../providers/userpersistance/userpersistance.provider';
import { PrenotazioneProvider } from '../providers/prenotazione/prenotazione.provider';

//custom pipes
import { CapitalizePipeModule } from '../pipes/capitalize.module'; // import our pipe here
import { SurnamePipeModule } from '../pipes/surname.module';
import {AgePipeModule} from '../pipes/age.module';

//pages
import {HomePage} from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import {MioProfiloPage} from '../pages/mio-profilo/mio-profilo';
import {RegistrazionePage} from '../pages/registrazione/registrazione';
import {RilasciaFeedbackPage} from '../pages/rilascia-feedback/rilascia-feedback';
import { ImagePicker } from '@ionic-native/image-picker';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MioProfiloPage,
    RegistrazionePage,
    RilasciaFeedbackPage
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
    LoginPage,
    MioProfiloPage,
    RegistrazionePage,
    RilasciaFeedbackPage
  ],
  providers: [
    StatusBar,
    DatePipe,
    Camera,
    File,
    FileTransfer,
    ImagePicker,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaProvider,
    MateriaProvider,
    RipetizioneProvider,
    UtenteProvider,
    AccountProvider,
    UserPersistanceProvider,
    PrenotazioneProvider
  ]
})
export class AppModule {}
