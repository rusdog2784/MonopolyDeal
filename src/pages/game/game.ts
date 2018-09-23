import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Deck } from '../../app/models/Deck';
import { Card } from '../../app/models/Card';
import { Player } from '../../app/models/Player';
import { CardPopover } from '../card_popover/card_popover';
import { Socket } from 'ng-socket-io';
//import { PropertyCard } from '../../app/models/PropertyCard';
//import { PropertyType } from '../../app/models/PropertyType';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {
    deck: Deck;
    mainPlayer: Player;
    playedCards: Card[];
    opponents: Player[];

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public popoverCtrl: PopoverController, private socket: Socket, private navParams: NavParams) {
        this.opponents = [];
        this.playedCards = [new Card('', 0)];
        this.mainPlayer = this.navParams.get('player');
        this.setupGame();
    }

    setupGame() {
        this.subscribeToPlayers().subscribe(data => {
            console.log("New player");
            let players: Player[] = data['players'];
            for (let player of players) {
                if (player.firstName != this.mainPlayer.firstName || player.lastName != this.mainPlayer.lastName) {
                    if (this.opponents.indexOf(player) < 0) {
                        console.log(player.firstName + " " + player.lastName);
                        this.opponents.push(player);
                    }
                }
            }
        });

        this.subscribeToCreateNewDeck().subscribe(() => {
            console.log("[game.ts] Asked to create a new deck!");
            this.createDeck();
        });

        this.subscribeToDeck().subscribe(data => {
            let updatedDeck: Deck = data['deck']['deck'];
            this.deck = updatedDeck;
        });

        this.subscribeToStart().subscribe(data => {
            let amount: number = data['amount'];
            let player: Player = data['player'];
            console.log("[game.ts] starting...");
            console.log("[game.ts] amount to pick up: " + amount);
            console.log("[game.ts] player name: " + player.firstName + " " + player.lastName);
            this.pullCards(amount);
        });

        this.subscribeToActionCards().subscribe(data => {
            let card: Card = data['card'];
            let player: Player = data['player'];
            console.log("Action card played by: " + player.firstName + " " + player.lastName);
        });

        this.subscribeToPropertyCards().subscribe(data => {
            let card: Card = data['card'];
            let player: Player = data['player'];
            console.log("Property card played by: " + player.firstName + " " + player.lastName);
        });

        this.subscribeToMoneyCards().subscribe(data => {
            let card: Card = data['card'];
            let player: Player = data['player'];
            console.log("Money card played by: " + player.firstName + " " + player.lastName);
        });
    }

    subscribeToPlayers() {
        let observable = new Observable(observer => {
            this.socket.on('new-player', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    subscribeToCreateNewDeck() {
        let observable = new Observable(observer => {
            this.socket.on('create-deck', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    subscribeToDeck() {
        let observable = new Observable(observer => {
            this.socket.on('deck-change', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    subscribeToStart() {
        let observable = new Observable(observer => {
            this.socket.on('pick-up-cards', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    subscribeToActionCards() {
        let observable = new Observable(observer => {
            this.socket.on('action-card-played', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    subscribeToPropertyCards() {
        let observable = new Observable(observer => {
            this.socket.on('property-card-played', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    subscribeToMoneyCards() {
        let observable = new Observable(observer => {
            this.socket.on('money-card-played', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    createDeck() {
        this.deck = new Deck();
        this.socket.emit('new-deck', {
            deck: this.deck
        });
    }

    presentCardOptions(ev, card: Card) {
        console.log("Player touched card:");
        console.log(card);
        let popover = this.popoverCtrl.create(CardPopover, {
            playedCards: this.playedCards,
            player: this.mainPlayer,
            card: card,
            event: ev
        });
        popover.present({
            ev: ev
        });
    }

    pullCards(amount:number) {
        console.log(this.deck);
        for (var i = 0; i < amount; i++) {
            this.mainPlayer.hand.push(this.deck['cards'][0]);
            this.deck.cards.splice(0, 1);
        }
        this.socket.emit('new-deck', {
            deck: this.deck
        });
    }

    endTurn() {
        if (this.opponents[0].hand.length > 7) {
            const alert = this.alertCtrl.create({
                title: 'Whoops!',
                subTitle: 'You seem to have too many cards. Please discard some cards.',
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