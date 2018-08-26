import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController } from 'ionic-angular';
import { Deck } from '../../app/models/Deck';
import { Card } from '../../app/models/Card';
import { Player } from '../../app/models/Player';
import { CardPopover } from '../card_popover/card_popover';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {
    deck: Deck;
    playedCards: Card[];
    players: Player[];

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public popoverCtrl: PopoverController, private socket: Socket) {
        this.players = [];
        this.setupGame();
    }

    setupGame() {
        this.deck = new Deck();
        this.playedCards = [new Card("Played Cards", 0)];

        let player1 = new Player("Scott", "Russell", 0);
        for (var i = 0; i < 5; i++) {
            player1.hand.push(this.deck.cards[0]);
            this.deck.cards.splice(0, 1);
        }
        this.players.push(player1);
        console.log("[game.ts] Player 1, " + player1.name + ", has been created.");
        console.log("[game.ts] Their hand contains:");
        console.log(player1.hand);

        let player2 = new Player("Morgan", "Lynn", 0);
        for (var i = 0; i < 5; i++) {
            player2.hand.push(this.deck.cards[0]);
            this.deck.cards.splice(0, 1);
        }
        this.players.push(player2);
        console.log("[game.ts] Player 2, " + player2.name + ", has been created.");
        console.log("[game.ts] Their hand contains:");
        console.log(player2.hand);

        console.log(this.players);
    }

    presentCardOptions(ev, card: Card) {
        console.log("Player touched card:");
        console.log(card);
        let popover = this.popoverCtrl.create(CardPopover, {
            playedCards: this.playedCards,
            player: this.players[0],
            card: card
        });
        popover.present({
            ev: ev
        });
    }

    pull2Cards() {
        for (var i = 0; i < 2; i++) {
            this.players[0].hand.push(this.deck.cards[0]);
            this.deck.cards.splice(0, 1);
        }
    }

    endTurn() {
        if (this.players[0].hand.length > 7) {
            const alert = this.alertCtrl.create({
                title: 'Whoops!',
                subTitle: 'You seem to have too many cards. Please select cards you want to discard.',
                buttons: ['OK']
            });
            alert.present();
        } else {
            const alert = this.alertCtrl.create({
                title: 'Turn Ended',
                buttons: ['OK']
            });
            alert.present();
        }
    }
}