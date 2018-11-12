import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { GamePage } from '../pages/game/game';
import { CardPopover } from '../pages/card_popover/card_popover';
import { WildcardPopover } from '../pages/wildcard_popover/wildcard_popover';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
// const config: SocketIoConfig = { url: 'http://monopoly-deal.herokuapp.com/', options: {} };
const config: SocketIoConfig = { url: 'http://localhost:9000/', options: {} };

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { IonicStorageModule } from '@ionic/storage';
import { SocketProvider } from '../providers/socket/socket';
import { PlayersPopover } from '../pages/players_popover/players_popover';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    GamePage,
    CardPopover,
    WildcardPopover,
    PlayersPopover
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    GamePage,
    CardPopover,
    WildcardPopover,
    PlayersPopover
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    SocketProvider
  ]
})
export class AppModule {}
