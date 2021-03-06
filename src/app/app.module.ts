import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NowPage } from '../pages/now/now';
import { SchedulePage } from '../pages/schedule/schedule';
import { SponsorsPage } from '../pages/sponsors/sponsors';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { HelpMePage } from '../pages/help-me/help-me';
import { DetailsPage } from '../pages/details/details';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { SessionChooserPage } from '../pages/session-chooser/session-chooser';
import { SpeakerPage } from '../pages/speaker/speaker';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    NowPage,
    SchedulePage,
    SponsorsPage,
    TabsControllerPage,
    HelpMePage,
    DetailsPage,
    SettingsPage,
    LoginPage,
    SessionChooserPage,
    SpeakerPage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NowPage,
    SchedulePage,
    SponsorsPage,
    TabsControllerPage,
    HelpMePage,
    DetailsPage,
    SettingsPage,
    LoginPage,
    SessionChooserPage,
    SpeakerPage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}