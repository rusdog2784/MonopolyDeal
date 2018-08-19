import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { GamePage } from '../pages/game/game';
import { CardPopover } from '../pages/card_popover/card_popover';
/*
import { ActionCard } from './models/ActionCard';
import { Card } from './models/Card';
import { Deck } from './models/Deck';
import { MoneyCard } from './models/MoneyCard';
import { Player } from './models/Player';
import { PropertyCard } from './models/PropertyCard';
import { PropertyType } from './models/PropertyType';
import { RentCard } from './models/RentCard';
import { Wildcard } from './models/Wildcard';
*/

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    GamePage,
    CardPopover
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    GamePage,
    CardPopover
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
