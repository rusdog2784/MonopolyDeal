//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Storage } from '@ionic/storage';

import { Player } from '../../app/models/Player';

@Injectable()
export class DataProvider {
  player: Player;

  constructor(private storage: Storage) {
    console.log('Hello DataProvider Provider');
    this.player = new Player("", "", 0);
  }

  setPlayer(firstName:string, lastName:string) {
    console.log("[data.ts]: Saving user data: " + firstName + " " + lastName);
    this.player.firstName = firstName;
    this.player.lastName = lastName;
  }

  getPlayer(): Player {
    return this.player;
  }

}
