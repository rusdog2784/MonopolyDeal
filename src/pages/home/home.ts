import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GamePage } from '../game/game';
import { DataProvider } from '../../providers/data/data';
import { Socket } from 'ng-socket-io';
import { Player } from '../../app/models/Player';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  firstName: string = "";
  lastName: string = "";
  player: Player;

  constructor(public navCtrl: NavController, public dataProvider: DataProvider, private socket: Socket) {
  }

  
  newGame(event, item) {
    if (this.firstName == "" || this.lastName == "") {
      console.log("Player name is empty");
      return;
    }
    this.dataProvider.setPlayer(this.firstName, this.lastName);
    this.socket.connect();
    this.socket.emit('player-entered', this.dataProvider.getPlayer());
    this.navCtrl.push(GamePage, {
      player: this.dataProvider.getPlayer()
    });
  }
}
