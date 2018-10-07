import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Card } from '../../app/models/Card';
import { Player } from '../../app/models/Player';
import { Socket } from 'ng-socket-io';

@Component({
    template: `
        <ion-list radio-group>
            <ion-row *ngFor="let type of types">
                <button ion-item detail-none (click)="takeAction(type)">{{type}}</button>
            </ion-row>
        </ion-list>
    `
})
export class WildcardPopover {
    player: Player;
    card: Card;
    types = [];

    constructor(private navParams: NavParams, private viewCtrl: ViewController, private socket: Socket) {

    }

    ngOnInit() {
        if (this.navParams.data) {
            this.player = this.navParams.data.player;
            this.card = this.navParams.data.card;
            this.types = this.navParams.data.types;
        }
    }

    takeAction(type) {
        this.player.addActiveCard(this.card, type);
        this.socket.emit('wildcard-card', {card: this.card, player: this.player, propertyChosen: type});
        this.player.turnCount++;
        this.viewCtrl.dismiss();
    }
}