import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Deck } from '../../app/models/Deck';
import { Card } from '../../app/models/Card';
import { Player } from '../../app/models/Player';
import { CardPopover } from '../card_popover/card_popover';
import { SocketProvider } from '../../providers/socket/socket';
import { CardType } from '../../app/models/CardType';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {
    deck: Deck;
    mainPlayer: Player;
    playedCards: Card[];
    opponents: Player[];

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public popoverCtrl: PopoverController, public socketProvider: SocketProvider, private navParams: NavParams) {
        this.opponents = [];
        this.playedCards = [new Card('', '', 0, CardType.None, [])];
        this.mainPlayer = this.navParams.get('player');
        this.setupGame();
    }

    setupGame() {
        this.socketProvider.subscribeTo('create-deck').subscribe(() => {
            this.createDeck();
        });

        this.socketProvider.subscribeTo('players').subscribe(data => {
            let players: Player[] = data['players'];
            this.handlePlayers(players);
        });
        
        this.socketProvider.subscribeTo('updated-deck').subscribe(data => {
            let updatedDeck: Deck = data['deck']['deck'];
            this.handleDeckChange(updatedDeck);
        });

        this.socketProvider.subscribeTo('initial-cards').subscribe(data => {
            let amount: number = data['amount'];
            //let player: Player = data['player'];
            this.pullCards(amount);
        });

        this.socketProvider.subscribeTo('my-turn').subscribe(() => {
            this.handleMyTurn();
        });

        this.socketProvider.subscribeTo('action-card-played').subscribe(data => {
            let card: Card = data['card'];
            let player: Player = data['player'];
            this.handleActionCardPlayed(card, player);
        });

        this.socketProvider.subscribeTo('rent-card-played').subscribe(data => {
            let card: Card = data['card'];
            let player: Player = data['player'];
            this.handleRentCardPlayed(card, player);
        })

        this.socketProvider.subscribeTo('property-card-played').subscribe(data => {
            let card: Card = data['card'];
            let player: Player = data['player'];
            this.handlePropertyCardPlayed(card, player);
        });

        this.socketProvider.subscribeTo('money-card-played').subscribe(data => {
            let card: Card = data['card'];
            let player: Player = data['player'];
            this.handleMoneyCardPlayed(card, player);
        });
    }

    handlePlayers(players) {
        // for (let player of players) {
        //     if (player.firstName != this.mainPlayer.firstName || player.lastName != this.mainPlayer.lastName) {
        //         if (this.opponents.length <= 0) {
        //             console.log("New player: " + player.firstName + " " + player.lastName);
        //             this.opponents.push(player);
        //         } else {
        //             for (let opponent of this.opponents) {
        //                 if (opponent.firstName != player.firstName || opponent.lastName != player.lastName) {
        //                     console.log("New player: " + player.firstName + " " + player.lastName);
        //                     this.opponents.push(player);
        //                 }
        //             }
        //         }
        //     }
        // }
        for (let player of players) {
            if (player.id != this.mainPlayer.id) {
                if (this.opponents.length <= 0) {
                    console.log("New player: " + player.firstName + " " + player.lastName + " (" + player.id + ")");
                    this.opponents.push(player);
                } else {
                    for (let opponent of this.opponents) {
                        if (opponent.id != player.id) {
                            console.log("New player: " + player.firstName + " " + player.lastName + " (" + player.id + ")");
                            this.opponents.push(player);
                        }
                    }
                }
            }
        }
    }

    handleDeckChange(updatedDeck) {
        let newDeck: Deck = updatedDeck;
        this.deck = newDeck;
    }

    handleMyTurn() {
        this.mainPlayer.myTurn = true;
        this.pullCards(2);
        this.displayYourTurn();
    }

    handleActionCardPlayed(card, player) {
        console.log("Action card (" + card.title + ") played by: " + player.firstName + " " + player.lastName + " (" + player.id + ")");
    }

    handleRentCardPlayed(card, player) {
        console.log("Rent card (" + card.title + ") played by: " + player.firstName + " " + player.lastName + " (" + player.id + ")");
    }

    handlePropertyCardPlayed(card, player) {
        console.log("Property card (" + card.title + ") played by: " + player.firstName + " " + player.lastName + " (" + player.id + ")");
    }

    handleMoneyCardPlayed(card, player) {
        console.log("Money card (" + card.title + ") played by: " + player.firstName + " " + player.lastName + " (" + player.id + ")");
        for (var i = 0; i < this.opponents.length; i++) {
            if (this.opponents[i].id == player.id) {
                this.opponents[i].value += card.value;
            }
        }
    }

    createDeck() {
        console.log("Creating new deck and emitting.");
        this.deck = new Deck();
        this.socketProvider.emit('new-deck', { deck: this.deck });
    }

    presentCardOptions(ev, card: Card) {
        if (this.mainPlayer.canPlay()) {
            console.log("Player touched card: " + card.title);
            let popover = this.popoverCtrl.create(CardPopover, {
                playedCards: this.playedCards,
                player: this.mainPlayer,
                card: card,
                event: ev
            });
            popover.present({
                ev: ev
            });
        } else {
            if (this.mainPlayer.outOfMoves()) {
                this.displayOutOfMoves();
            } else {
                this.displayNotYourTurn();
            }
        }
    }

    pullCards(amount:number) {
        console.log("Pulling " + amount + " cards and emitting new deck.");
        for (var i = 0; i < amount; i++) {
            let card: Card = this.deck['cards'][0];
            this.mainPlayer.hand.push(card);
            this.deck.cards.splice(0, 1);
        }
        this.socketProvider.emit('new-deck', { deck: this.deck });
    }

    endTurn() {
        if (this.mainPlayer.hand.length > 7) {
            this.displayTooManyCards();
        } else if (this.mainPlayer.myTurn == false) {
            this.displayNotYourTurn();
        } else {
            this.displayEndYourTurn();
        }
    }

    displayNotYourTurn() {
        const alert = this.alertCtrl.create({
            title: "Sorry",
            subTitle: "It's not currently your turn",
            buttons: ['Ok']
        });
        alert.present();
    }

    displayOutOfMoves() {
        const alert = this.alertCtrl.create({
            title: "Sorry",
            subTitle: "You have played 3 cards. Please end your turn.",
            buttons: ['Ok']
        });
        alert.present();
    }

    displayYourTurn() {
        const alert = this.alertCtrl.create({
            title: "Hey!",
            subTitle: "It's your turn.",
            buttons: ['Ok']
        });
        alert.present();
    }

    displayEndYourTurn() {
        const alert = this.alertCtrl.create({
            title: 'Turn Ended',
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                        alert.dismiss().then(() => { 
                            this.mainPlayer.myTurn = false;
                            this.mainPlayer.turnCount = 0;
                            this.socketProvider.emit('end-turn', { player: this.mainPlayer });
                        });
                        return false;
                    }
                }
            ]
        });
        alert.present();
    }

    displayTooManyCards() {
        const alert = this.alertCtrl.create({
            title: 'Whoops!',
            subTitle: 'You seem to have too many cards. Please discard some cards.',
            buttons: ['OK']
        });
        alert.present();
    }
}