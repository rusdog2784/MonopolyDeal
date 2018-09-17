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
  player: Player;

  constructor(public navCtrl: NavController, public dataProvider: DataProvider, private socket: Socket) {
    this.player = dataProvider.getPlayer();
    console.log("Player: " + this.player.firstName + " " + this.player.lastName);
  }

  newGame(event, item) {
    if (this.player.firstName == "" || this.player.lastName == "") {
      console.log("Player name is empty");
      return;
    }
    this.socket.connect();
    this.socket.emit('player-entered', this.player);
    this.navCtrl.push(GamePage, {
      player: this.player
    });
  }

}
