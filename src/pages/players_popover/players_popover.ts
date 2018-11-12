import { Component } from '@angular/core';
import { Card } from '../../app/models/Card';
import { Player } from '../../app/models/Player';

import { PropertyType } from "../../app/models/PropertyType";
import { CardType } from "../../app/models/CardType";
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
    selector: 'players-popover',
    templateUrl: 'players_popover.html'
})
export class PlayersPopover {
    card: Card;
    opponents: Player[] = [];
    player: Player;

    constructor(private navParams: NavParams) {
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

        // p1.value += oneM.value;
        // p1.moneyCards.push(oneM);
        // p1.organizeMoneyCards();
        // p1.value += threeM.value;
        // p1.moneyCards.push(threeM);
        // p1.organizeMoneyCards();
        // p1.value += oneM.value;
        // p1.moneyCards.push(oneM);
        // p1.organizeMoneyCards()

        // p1.addActiveCard(readingRailroad, readingRailroad.propertyTypes[0]);
        // p1.addActiveCard(pennsylvaniaRailroad, pennsylvaniaRailroad.propertyTypes[0]);
        // p1.addActiveCard(statesAvenue, statesAvenue.propertyTypes[0]);
        
        // p2.value += threeM.value;
        // p2.moneyCards.push(threeM);
        // p2.organizeMoneyCards();
        // p2.value += twoM.value;
        // p2.moneyCards.push(twoM);
        // p2.organizeMoneyCards()

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

    takeAction() {
    }
}