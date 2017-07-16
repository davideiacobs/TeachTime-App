import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

//pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrazionePage } from '../pages/registrazione/registrazione';
import {MioProfiloPage} from '../pages/mio-profilo/mio-profilo';
import {RilasciaFeedbackPage} from '../pages/rilascia-feedback/rilascia-feedback';

//providers
import { AccountProvider } from '../providers/account/account.provider';


    @Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;

  rootPage:any = "HomePage";
  
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public sAccount : AccountProvider,
              public events: Events) {
     this.initializeApp();
     
     events.subscribe('user:login', () => {
        this.loggedIn();
      });
     events.subscribe('toLogin', () => {
         this.nav.push(LoginPage); 
     });
     events.subscribe('toRegistrazione', () => {
        this.nav.push(RegistrazionePage); 
     });
     events.subscribe('feedback:rilasciato', () => {
         this.nav.setRoot(RilasciaFeedbackPage); 
     });
     /*events.subscribe('toMioProfilo', () => { 
        this.nav.set 
     });*/
  }
  
  
  initializeApp() {
      this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loggedIn();
      
    });
      
  }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    if(page.component) {
        this.nav.setRoot(page.component);
    } else {
        // Since the component is null, this is the logout option
        // ...

        this.sAccount.initialize().then(() => {
           this.sAccount.logout().then(() => {
                this.pages = [
                    { title: 'Home', component: HomePage },
                    { title: 'Login', component: LoginPage },
                    { title: 'Registrati', component: RegistrazionePage}
                ];
               // redirect to home
               this.nav.setRoot(HomePage);
           }); 
        });

        
    }
  }
  
  
  loggedIn(){
      this.sAccount.initialize().then(() => {
            if(this.sAccount.isLogged()){
              this.pages = [
                  { title: 'Home', component: HomePage },
                  { title: 'Il Mio Profilo', component: MioProfiloPage },
                  { title: 'Logout', component: null},
                  { title: 'Rilascia Feedback', component: RilasciaFeedbackPage}
              ];
              this.nav.setRoot(HomePage);
            }else{
                this.pages = [
                  { title: 'Home', component: HomePage },
                  { title: 'Login', component: LoginPage },
                  { title: 'Registrati', component: RegistrazionePage}
              ];
            }
      });
      
  }
  
  
 
}