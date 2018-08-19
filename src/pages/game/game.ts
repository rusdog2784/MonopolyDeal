import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Deck } from '../../app/models/Deck';
import { Card } from '../../app/models/Card';
import { Player } from '../../app/models/Player';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {
    deck: Deck;
    playedCards: Card[];
    players: Player[];

    constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
        this.playedCards = [];
        this.players = [];
        this.setupGame();
    }

    setupGame() {
        this.deck = new Deck();
        console.log("[game.ts] Deck created! There are " + this.deck.cards.length + " cards.");
        let player1 = new Player("Scott");
        for (var i = 0; i < 5; i++) {
            player1.cards.push(this.deck.cards[0]);
            this.deck.cards.splice(0, 1);
        }
        this.players.push(player1);
        console.log("[game.ts] Player 1, " + player1.name + ", has been created.");
        console.log("[game.ts] Their hand contains:");
        console.log(player1.cards);

        let player2 = new Player("Morgan");
        for (var i = 0; i < 5; i++) {
            player2.cards.push(this.deck.cards[0]);
            this.deck.cards.splice(0, 1);
        }
        this.players.push(player2);
        console.log("[game.ts] Player 2, " + player2.name + ", has been created.");
        console.log("[game.ts] Their hand contains:");
        console.log(player2.cards);

        console.log(this.players);
    }

    playerCardTouched(card: Card) {
        console.log("Player touched card:");
        console.log(card);
    }

    pull2Cards() {
        for (var i = 0; i < 2; i++) {
            this.players[0].cards.push(this.deck.cards[0]);
            this.deck.cards.splice(0, 1);
        }
    }

    endTurn() {
        if (this.players[0].cards.length > 7) {
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