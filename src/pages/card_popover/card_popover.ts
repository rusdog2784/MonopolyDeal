import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { CardOptions } from '../../app/models/CardOptions';
import { ActionCard } from '../../app/models/ActionCard';
import { PropertyCard } from '../../app/models/PropertyCard';

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

    constructor(private navParams: NavParams, private viewCtrl: ViewController) {

    }

    ngOnInit() {
        if (this.navParams.data) {
            this.playedCards = this.navParams.data.playedCards;
            this.player = this.navParams.data.player;
            this.card = this.navParams.data.card;
        }
    }

    takeAction(action: CardOptions) {
        switch (action) {
            case 'PLAY':
                console.log("Taking action: PLAY");
                let index = this.player.hand.indexOf(this.card);
                this.player.hand.splice(index, 1);
                if (this.card instanceof ActionCard) {
                    this.playedCards.push(this.card);
                } else if (this.card instanceof PropertyCard) {
                    this.player.activeCards.push(this.card);
                }
                this.player.turnCount++;
                break;
            case 'MONETIZE':
                console.log("Taking action: MONETIZE");
                let cardValue = this.card.value;
                this.player.value += cardValue;
                this.player.money.push(this.card);
                let index = this.player.hand.indexOf(this.card);
                this.player.hand.splice(index, 1);
                this.player.turnCount++;
                break;
            case 'DISCARD':
                console.log("Taking action: DISCARD");
                let index = this.player.hand.indexOf(this.card);
                this.player.hand.splice(index, 1);
                this.playedCards.push(this.card);
                break;
            default:
                break;
        }
        this.viewCtrl.dismiss();
    }
}