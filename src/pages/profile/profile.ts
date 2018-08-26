import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Player } from '../../app/models/Player';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  firstName: string = "";
  lastName: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
    let player: Player = dataProvider.getPlayer();
    this.firstName = player.firstName;
    this.lastName = player.lastName;
  }

  saveData() {
    if (this.firstName == "" || this.lastName == "") {
      return;
    }
    this.dataProvider.setPlayer(this.firstName, this.lastName);
  }
}
