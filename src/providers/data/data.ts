//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { Player } from '../../app/models/Player';
import { SocketProvider } from '../socket/socket';

@Injectable()
export class DataProvider {
  player: Player;

  constructor() {
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
