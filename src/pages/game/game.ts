import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Deck } from '../../app/models/Deck';
import { Card } from '../../app/models/Card';
import { Player } from '../../app/models/Player';
import { CardPopover } from '../card_popover/card_popover';
import { Socket } from 'ng-socket-io';
import { PropertyCard } from '../../app/models/PropertyCard';
import { PropertyType } from '../../app/models/PropertyType';
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
        this.mainPlayer = this.navParams.get('player');
        this.setupGame();
    }

    setupGame() {
        this.subscribeToPlayers().subscribe(data => {
            console.log("[game.ts] New player.");
            console.log(data);
            console.log(typeof(data));
            let players: Player[] = data['players'];
            for (let p of players) {
                if (p.firstName != this.mainPlayer.firstName || p.lastName != this.mainPlayer.lastName) {
                    if (this.opponents.indexOf(p) < 0) {
                        console.log("[game.ts] Adding player to opponent list");
                        console.log(p);
                        this.opponents.push(p);
                    }
                }
            }
        });

        this.subscribeToCreateNewDeck().subscribe(() => {
            console.log("[game.ts] Asked to create a new deck!");
            this.createDeck();
        });

        this.subscribeToDeck().subscribe(data => {
            let updatedDeck: Deck = data['deck'];
            console.log("[game.ts] Updated deck: ");
            console.log(updatedDeck);
            this.deck = updatedDeck;
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

    createDeck() {
        this.deck = new Deck();
        this.socket.emit('new-deck', {
            deck: this.deck.cards
        });
    }

    presentCardOptions(ev, card: Card) {
        console.log("Player touched card:");
        console.log(card);
        let popover = this.popoverCtrl.create(CardPopover, {
            playedCards: this.playedCards,
            player: this.opponents[0],
            card: card,
            event: ev
        });
        popover.present({
            ev: ev
        });
    }

    pull2Cards() {
        for (var i = 0; i < 2; i++) {
            this.opponents[0].hand.push(this.deck.cards[0]);
            this.deck.cards.splice(0, 1);
        }
    }

    endTurn() {
        if (this.opponents[0].hand.length > 7) {
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