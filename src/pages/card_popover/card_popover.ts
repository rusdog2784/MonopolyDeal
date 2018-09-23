import { Component } from '@angular/core';
import { NavParams, ViewController, PopoverController, Popover } from 'ionic-angular';
//import { CardOptions } from '../../app/models/CardOptions';
import { ActionCard } from '../../app/models/ActionCard';
import { PropertyCard } from '../../app/models/PropertyCard';
import { Card } from '../../app/models/Card';
import { Player } from '../../app/models/Player';
import { MoneyCard } from '../../app/models/MoneyCard';
import { Wildcard } from '../../app/models/Wildcard';
import { RentCard } from '../../app/models/RentCard';
import { WildcardPopover } from '../wildcard_popover/wildcard_popover';
import { Socket } from 'ng-socket-io';

@Component({
    template: `
        <ion-list radio-group>
            <ion-row>
                <button ion-item detail-none (click)="takeAction('PLAY')">Play</button>
            </ion-row>
            <ion-row>
                <button ion-item detail-none (click)="takeAction('MONETIZE')">Monetize</button>
            </ion-row>
            <ion-row>
                <button ion-item detail-none (click)="takeAction('DISCARD')">Discard</button>
            </ion-row>
        </ion-list>
    `
})
export class CardPopover {
    playedCards: Card[];
    player: Player;
    card: Card;
    event;

    constructor(private navParams: NavParams, private viewCtrl: ViewController, public popoverCtrl: PopoverController, private socket: Socket) {

    }

    ngOnInit() {
        if (this.navParams.data) {
            this.playedCards = this.navParams.data.playedCards;
            this.player = this.navParams.data.player;
            this.card = this.navParams.data.card;
            this.event = this.navParams.data.event;
        }
    }

    takeAction(action: string) {
        var index: number;
        switch (action) {
            case 'PLAY':
                console.log("Taking action: PLAY");
                index = this.player.hand.indexOf(this.card);
                this.player.hand.splice(index, 1);
                if (this.card instanceof ActionCard || this.card instanceof RentCard) {
                    this.playedCards.push(this.card);
                    this.socket.emit('action-card', {card: this.card, player: this.player});
                } else if (this.card instanceof PropertyCard) {
                    this.player.addActiveCard(this.card, this.card.type);
                    this.socket.emit('property-card', {card: this.card, player: this.player});
                } else if (this.card instanceof Wildcard) {
                    this.viewCtrl.dismiss();
                    this.presentCardOptions(this.card.types);
                    this.socket.emit('property-card', {card: this.card, player: this.player});
                } else if (this.card instanceof MoneyCard) {
                    let cardValue = this.card.value;
                    this.player.value += cardValue;
                    this.player.moneyCards.push(this.card);
                    this.player.organizeMoneyCards();
                    this.socket.emit('money-card', {card: this.card, player: this.player});
                }
                this.player.turnCount++;
                break;
            case 'MONETIZE':
                console.log("Taking action: MONETIZE");
                let cardValue = this.card.value;
                this.player.value += cardValue;
                this.player.moneyCards.push(this.card);
                this.player.organizeMoneyCards();
                index = this.player.hand.indexOf(this.card);
                this.player.hand.splice(index, 1);
                this.socket.emit('money-card', {card: this.card, player: this.player});
                this.player.turnCount++;
                break;
            case 'DISCARD':
                console.log("Taking action: DISCARD");
                index = this.player.hand.indexOf(this.card);
                this.player.hand.splice(index, 1);
                this.playedCards.push(this.card);
                break;
            default:
                break;
        }
        this.viewCtrl.dismiss();
    }

    presentCardOptions(types) {
        console.log("Wildcard popover...");
        console.log(this.player);
        console.log(this.card);
        let popover = this.popoverCtrl.create(WildcardPopover, {
            player: this.player,
            card: this.card,
            types: types
        });
        popover.present();
    }
}