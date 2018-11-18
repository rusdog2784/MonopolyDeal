import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Deck } from '../../app/models/Deck';
import { Card } from '../../app/models/Card';
import { Player } from '../../app/models/Player';
import { CardPopover } from '../card_popover/card_popover';
import { OpponentActionsPopover } from '../opponent_actions_popover/opponent_actions_popover';
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
    opponents_actions: String[];

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public popoverCtrl: PopoverController, public socketProvider: SocketProvider, private navParams: NavParams) {
        this.opponents = [];
        this.opponents_actions = [];
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
            this.pullCards(amount);
        });

        this.socketProvider.subscribeTo('my-turn').subscribe(data => {
            let updatedPlayer:Player = data['updatedPlayer'];
            this.handleMyTurn(updatedPlayer);
        });

        this.socketProvider.subscribeTo('action-card-action-required').subscribe(data => {
            let card: Card = data['card'];
            let from: Player = data['from'];
            this.handleActionCardActionRequired(card, from);
        });

        this.socketProvider.subscribeTo('action-card-result').subscribe(data => {
            let cards: Card[] = data['cards'];
            let from: Player = data['from'];
            this.handleActionCardResult(cards, from);
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
        for (let player of players) {
            if (player.id != this.mainPlayer.id) {
                if (this.opponents.length <= 0) {
                    let action_taken:String = player.firstName + " " + player.lastName + " entered the game.";
                    this.opponents_actions.push(action_taken);
                    console.log(action_taken);
                    this.opponents.push(player);
                } else {
                    for (let opponent of this.opponents) {
                        if (opponent.id != player.id) {
                            let action_taken:String = player.firstName + " " + player.lastName + " entered the game.";
                            this.opponents_actions.push(action_taken);
                            console.log(action_taken);
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

    handleMyTurn(updatedPlayer:Player) {
        if (updatedPlayer != undefined) {
            for (var i = 0; i < this.opponents.length; i++) {
                if (this.opponents[i].id == updatedPlayer.id) {
                    let action_taken:String = updatedPlayer.firstName + " " + updatedPlayer.lastName + " ended their turn.";
                    this.opponents_actions.push(action_taken);
                    this.opponents[i] = updatedPlayer;
                    break;
                }
            }
        }
        this.mainPlayer.myTurn = true;
        this.pullCards(2);
        this.displayYourTurn();
    }

    handleActionCardActionRequired(card, from) {
        let action_taken:String = from.firstName + " " + from.lastName + " played the " + card.title + " action card.";
        this.opponents_actions.push(action_taken);
        console.log(action_taken);
        this.displayActionCardPlayedAgainst(card, from)
    }

    handleActionCardResult(cards, from) {
        console.log("Action card results: " + from.firstName + " " + from.lastName + " (" + from.id + ") gave you...");
        console.log(cards);
    }

    handleRentCardPlayed(card, player) {
        let action_taken:String = player.firstName + " " + player.lastName + " played the " + card.title + " rent card.";
        this.opponents_actions.push(action_taken);
        console.log(action_taken);
    }

    handlePropertyCardPlayed(card, player) {
        let action_taken:String = player.firstName + " " + player.lastName + " played the " + card.title + " property card.";
        this.opponents_actions.push(action_taken);
        console.log(action_taken);
    }

    handleMoneyCardPlayed(card, player) {
        let action_taken:String = player.firstName + " " + player.lastName + " played the " + card.title + " money card.";
        this.opponents_actions.push(action_taken);
        console.log(action_taken);
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
                event: ev,
                opponents: this.opponents
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

    presentOpponentActionsTaken(ev) {
        let popover = this.popoverCtrl.create(OpponentActionsPopover, {
            opponents_actions: this.opponents_actions
        });
        popover.present();
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
            buttons: ['Ok']
        });
        alert.present();
    }

    displayActionCardPlayedAgainst(card, player) {
        const alert = this.alertCtrl.create({
            title: card.title + " played by " + player.firstName + " " + player.lastName,
            subTitle: 'Please take action.',
            buttons: [
                {
                    text: "Ok",
                    handler: () => {
                        alert.dismiss().then(() => {
                            this.socketProvider.emit('action-card-action-for', { cards: [], from: this.mainPlayer, to: player});
                        });
                        return false;
                    }
                }
            ]
        });
        alert.present();
    }
}