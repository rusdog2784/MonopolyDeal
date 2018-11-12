import { Component } from '@angular/core';
import { Card } from '../../app/models/Card';
import { Player } from '../../app/models/Player';
import { SocketProvider } from '../../providers/socket/socket';
import { PropertyType } from "../../app/models/PropertyType";
import { CardType } from "../../app/models/CardType";
import { NavParams, ViewController } from 'ionic-angular';
import { ActionCardTitles } from '../../app/models/ActionCardTitles';

@Component({
    selector: 'players-popover',
    templateUrl: 'players_popover.html'
})
export class PlayersPopover {
    // card: Card = new Card(ActionCardTitles.DebtCollector, '', 3, CardType.Action, []);
    card: Card;
    opponents: Player[] = [];
    player: Player;

    constructor(private navParams: NavParams, private viewCtrl: ViewController, public socketProvider: SocketProvider) {
        // var p1 = new Player("Scott", "Russell", 0);
        // var p2 = new Player("Morgan", "Lynn", 0);
        // let northCarolinaAve = new Card("North Carolina Avenue", "", 4, CardType.Property, [PropertyType.Green]);
        // let indianaAvenue = new Card("Indiana Avenue", "", 3, CardType.Property, [PropertyType.Red]);
        // let readingRailroad = new Card("Reading Railroad", "", 2, CardType.Property, [PropertyType.Railroad]);
        // let pennsylvaniaRailroad = new Card("Pennsylvania Railroad", "", 2, CardType.Property, [PropertyType.Railroad]);
        // let waterWorks = new Card("Water Works", "", 2, CardType.Property, [PropertyType.Utility]);
        // let statesAvenue = new Card("States Avenue", "", 2, CardType.Property, [PropertyType.Purple]);
        // let oneM = new Card("1M", "", 1, CardType.Money, []);
        // let twoM = new Card("2M", "", 2, CardType.Money, []);
        // let threeM = new Card("3M", "", 3, CardType.Money, []);

        // p1.addActiveCard(northCarolinaAve, northCarolinaAve.propertyTypes[0]);
        // p1.addActiveCard(indianaAvenue, indianaAvenue.propertyTypes[0]);
        // p1.addActiveCard(waterWorks, waterWorks.propertyTypes[0]);

        // p1.addMoneyCard(oneM);
        // p1.addMoneyCard(threeM);
        // p1.addMoneyCard(oneM);

        // p2.addActiveCard(readingRailroad, readingRailroad.propertyTypes[0]);
        // p2.addActiveCard(pennsylvaniaRailroad, pennsylvaniaRailroad.propertyTypes[0]);
        // p2.addActiveCard(statesAvenue, statesAvenue.propertyTypes[0]);
        
        // p2.addMoneyCard(threeM);
        // p2.addMoneyCard(twoM);

        // this.opponents.push(p1);
        // this.opponents.push(p2);
    }

    ngOnInit() {
        if (this.navParams.data) {
            this.card = this.navParams.data.card;
            this.opponents = this.navParams.data.opponents;
            this.player = this.navParams.data.player;
        }
    }

    chosenPlayer(opponent:Player) {
        this.viewCtrl.dismiss();
        this.socketProvider.emit('action-card-played-against', { from: this.player, recipients: [opponent.id], card: this.card });
    }
}