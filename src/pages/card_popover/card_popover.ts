import { Component } from '@angular/core';
import { NavParams, ViewController, PopoverController } from 'ionic-angular';
import { Card } from '../../app/models/Card';
import { Player } from '../../app/models/Player';
import { WildcardPopover } from '../wildcard_popover/wildcard_popover';
import { PlayersPopover } from '../players_popover/players_popover';
import { SocketProvider } from '../../providers/socket/socket';
import { CardType } from '../../app/models/CardType';

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
    opponents: Player[];

    constructor(private navParams: NavParams, private viewCtrl: ViewController, public popoverCtrl: PopoverController, public socketProvider: SocketProvider) {
    }

    ngOnInit() {
        if (this.navParams.data) {
            this.playedCards = this.navParams.data.playedCards;
            this.player = this.navParams.data.player;
            this.card = this.navParams.data.card;
            this.event = this.navParams.data.event;
            this.opponents = this.navParams.data.opponents;
            console.log(this.opponents);
        }
    }

    takeAction(action: string) {
        var index: number;
        switch (action) {
            case 'PLAY':
                console.log("Taking action: PLAY");
                index = this.player.hand.indexOf(this.card);
                this.player.hand.splice(index, 1);
                console.log(this.card);
                if (this.card.cardType == CardType.Action) {
                    this.presentPlayers();
                    // this.playedCards.push(this.card);
                    // this.socketProvider.emit('action-card', { card: this.card, player: this.player.id });
                } else if (this.card.cardType == CardType.Rent) {
                    this.playedCards.push(this.card);
                    this.socketProvider.emit('rent-card', { card: this.card, player: this.player });
                } else if (this.card.cardType == CardType.Property) {
                    this.player.addActiveCard(this.card, this.card.propertyTypes[0]);
                    this.socketProvider.emit('property-card', { card: this.card, player: this.player });
                } else if (this.card.cardType == CardType.Wildcard) {
                    this.viewCtrl.dismiss();
                    this.presentWildcardOptions(this.card.propertyTypes);
                    return;
                } else if (this.card.cardType == CardType.Money) {
                    this.player.addMoneyCard(this.card);
                    // let cardValue = this.card.value;
                    // this.player.value += cardValue;
                    // this.player.moneyCards.push(this.card);
                    // this.player.organizeMoneyCards();
                    this.socketProvider.emit('money-card', { card: this.card, player: this.player });
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
                this.socketProvider.emit('money-card', { card: this.card, player: this.player });
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

    presentWildcardOptions(types) {
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

    presentPlayers() {
        console.log("View players popover...");
        let popover = this.popoverCtrl.create(PlayersPopover, {
            card: this.card,
            player: this.player,
            opponents: this.opponents
        });
        popover.present();
    }
}