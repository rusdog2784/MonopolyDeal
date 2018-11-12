import { Card } from "./Card";
import { PropertyType } from "./PropertyType";
import { CardType } from "./CardType";
import { ActionCardTitles } from './ActionCardTitles';

export class Deck {
    cards: Card[];
    actionCards: Card[];
    propertyCards: Card[];
    wildcards: Card[];
    rentCards: Card[];
    moneyCards: Card[];

    constructor() {
        this.cards = [];
        this.actionCards = [];
        this.propertyCards = [];
        this.wildcards = [];
        this.rentCards = [];
        this.moneyCards = [];
        this.initializeActionCards();
        this.initializePropertyCards();
        this.initializeWildcards();
        this.initializeRentCards();
        this.initializeMoneyCards();
        this.createDeck();
    }

    initializeActionCards() {
        let dealBreaker = new Card(ActionCardTitles.DealBreaker, "Steals a complete set of properties from any player. (Includes any buildings) Play into center to use.", 5, CardType.Action, []);
        let justSayNo = new Card(ActionCardTitles.JustSayNo, "Use any time when an action card is played against you. Play into center to use.", 4, CardType.Action, []);
        let slyDeal = new Card(ActionCardTitles.SlyDeal, "Steal a property from the player of your choice. (Cannot be part of a full set) Play into center to use.", 3, CardType.Action, []);
        let forcedDeal = new Card(ActionCardTitles.ForcedDeal, "Swap any property with another player. (Cannot be part of a full set) Play into center to use.", 3, CardType.Action, []);
        let debtCollector = new Card(ActionCardTitles.DebtCollector, "Force any player to pay you 5M. Play into center to use.", 3, CardType.Action, []);
        let itsMyBirthday = new Card(ActionCardTitles.ItsMyBirthday, "All players give you 2M as a 'gift'. Play into center to use.", 2, CardType.Action, []);
        let passGo = new Card(ActionCardTitles.PassGo, "Draw 2 extra cards. Play into center to use.", 1, CardType.Action, []);
        let house = new Card(ActionCardTitles.House, "Add onto any full set you own to add 3M to the rent value. (Except railroads and Utility)", 3, CardType.Action, []);
        let hotel = new Card(ActionCardTitles.Hotel, "Add onto any full set you own to add 4M to the rent value. (Except railroads and Utility)", 4, CardType.Action, []);
        let doubleTheRent = new Card(ActionCardTitles.DoubleTheRent, "Needs to played with a rent card. Play into center to use.", 1, CardType.Action, []);
        var i;
        for (i = 0; i < 2; i++) {
            this.actionCards.push(dealBreaker);
            this.actionCards.push(doubleTheRent);
        }
        for (i = 0; i < 3; i++) {
            this.actionCards.push(justSayNo);
            this.actionCards.push(slyDeal);
            this.actionCards.push(debtCollector);
            this.actionCards.push(itsMyBirthday);
            this.actionCards.push(house);
            this.actionCards.push(hotel);
        }
        for (i = 0; i < 4; i++) {
            this.actionCards.push(forcedDeal);
        }
        for (i = 0; i < 10; i++) {
            this.actionCards.push(passGo);
        }
    }

    initializePropertyCards() {
        let northCarolinaAve = new Card("North Carolina Avenue", "", 4, CardType.Property, [PropertyType.Green]);
        let pacificAvenue = new Card("Pacific Avenue", "", 4, CardType.Property, [PropertyType.Green]);
        let pennsylvaniaAvenue = new Card("Pennsylvania Avenue", "", 4, CardType.Property, [PropertyType.Green]);
        this.propertyCards.push(northCarolinaAve);
        this.propertyCards.push(pacificAvenue);
        this.propertyCards.push(pennsylvaniaAvenue);
        let boardwalk = new Card("Boardwalk", "", 4, CardType.Property, [PropertyType.DarkBlue]);
        let parkPlace = new Card("Park Place", "", 4, CardType.Property, [PropertyType.DarkBlue]);
        this.propertyCards.push(boardwalk);
        this.propertyCards.push(parkPlace);
        let connecticutAvenue = new Card("Connecticut Avenue", "", 1, CardType.Property, [PropertyType.LightBlue]);
        let orientalAvenue = new Card("Oriental Avenue", "", 1, CardType.Property, [PropertyType.LightBlue]);
        let vermontAvenue = new Card("Vermont Avenue", "", 1, CardType.Property, [PropertyType.LightBlue]);
        this.propertyCards.push(connecticutAvenue);
        this.propertyCards.push(orientalAvenue);
        this.propertyCards.push(vermontAvenue);
        let kentuckyAvenue = new Card("Kentucky Avenue", "", 3, CardType.Property, [PropertyType.Red]);
        let indianaAvenue = new Card("Indiana Avenue", "", 3, CardType.Property, [PropertyType.Red]);
        let illinoisAvenue = new Card("Illinois Avenue", "", 3, CardType.Property, [PropertyType.Red]);
        this.propertyCards.push(kentuckyAvenue);
        this.propertyCards.push(indianaAvenue);
        this.propertyCards.push(illinoisAvenue);
        let shortLine = new Card("Short Line", "", 2, CardType.Property, [PropertyType.Railroad]);
        let boRailroad = new Card("B & O Railroad", "", 2, CardType.Property, [PropertyType.Railroad]);
        let readingRailroad = new Card("Reading Railroad", "", 2, CardType.Property, [PropertyType.Railroad]);
        let pennsylvaniaRailroad = new Card("Pennsylvania Railroad", "", 2, CardType.Property, [PropertyType.Railroad]);
        this.propertyCards.push(shortLine);
        this.propertyCards.push(boRailroad);
        this.propertyCards.push(readingRailroad);
        this.propertyCards.push(pennsylvaniaRailroad);
        let ventnorAvenue = new Card("Ventnor Avenue", "", 3, CardType.Property, [PropertyType.Yellow]);
        let marvinGardens = new Card("Marvin Gardens", "", 3, CardType.Property, [PropertyType.Yellow]);
        let atlanticAvenue = new Card("Atlantic Avenue", "", 3, CardType.Property, [PropertyType.Yellow]);
        this.propertyCards.push(ventnorAvenue);
        this.propertyCards.push(marvinGardens);
        this.propertyCards.push(atlanticAvenue);
        let newYorkAvenue = new Card("New York Avenue", "", 2, CardType.Property, [PropertyType.Orange]);
        let stJamesPlace = new Card("St James Place", "", 2, CardType.Property, [PropertyType.Orange]);
        let tennesseeAvenue = new Card("Tennessee Avenue", "", 2, CardType.Property, [PropertyType.Orange]);
        this.propertyCards.push(newYorkAvenue);
        this.propertyCards.push(stJamesPlace);
        this.propertyCards.push(tennesseeAvenue);
        let balticAvenue = new Card("Baltic Avenue", "", 1, CardType.Property, [PropertyType.Brown]);
        let mediterraneanAvenue = new Card("Mediterranean Avenue", "", 1, CardType.Property, [PropertyType.Brown]);
        this.propertyCards.push(balticAvenue);
        this.propertyCards.push(mediterraneanAvenue);
        let stCharlesPlace = new Card("St Charles Place", "", 2, CardType.Property, [PropertyType.Purple]);
        let virginiaAvenue = new Card("Virginia Avenue", "", 2, CardType.Property, [PropertyType.Purple]);
        let statesAvenue = new Card("States Avenue", "", 2, CardType.Property, [PropertyType.Purple]);
        this.propertyCards.push(stCharlesPlace);
        this.propertyCards.push(virginiaAvenue);
        this.propertyCards.push(statesAvenue);
        let waterWorks = new Card("Water Works", "", 2, CardType.Property, [PropertyType.Utility]);
        let electricCompany = new Card("Electric Company", "", 2, CardType.Property, [PropertyType.Utility]);
        this.propertyCards.push(waterWorks);
        this.propertyCards.push(electricCompany);
    }

    initializeWildcards() {
        let all = new Card("Property Wild Card", "", 0, CardType.Wildcard, [PropertyType.Green, PropertyType.DarkBlue, PropertyType.LightBlue, PropertyType.Red, PropertyType.Railroad, PropertyType.Yellow, PropertyType.Orange, PropertyType.Brown, PropertyType.Purple, PropertyType.Utility]);
        let darkBlueAndGreen = new Card("Property Wild Card", "", 4, CardType.Wildcard, [PropertyType.DarkBlue, PropertyType.Green]);
        let lightBlueAndBrown = new Card("Property Wild Card", "", 1, CardType.Wildcard, [PropertyType.LightBlue, PropertyType.Brown]);
        let lightBlueAndRailroad = new Card("Property Wild Card", "", 4, CardType.Wildcard, [PropertyType.LightBlue, PropertyType.Railroad]);
        let purpleAndOrange = new Card("Property Wild Card", "", 2, CardType.Wildcard, [PropertyType.Purple, PropertyType.Orange]);
        let railroadAndGreen = new Card("Property Wild Card", "", 4, CardType.Wildcard, [PropertyType.Railroad, PropertyType.Green]);
        let railroadAndUtility = new Card("Property Wild Card", "", 2, CardType.Wildcard, [PropertyType.Railroad, PropertyType.Utility]);
        let redAndYellow = new Card("Property Wild Card", "", 3, CardType.Wildcard, [PropertyType.Red, PropertyType.Yellow]);
        this.wildcards.push(darkBlueAndGreen);
        this.wildcards.push(lightBlueAndBrown);
        this.wildcards.push(lightBlueAndRailroad);
        this.wildcards.push(railroadAndGreen);
        this.wildcards.push(railroadAndUtility);
        for (var i = 0; i < 2; i++) {
            this.wildcards.push(purpleAndOrange);
            this.wildcards.push(redAndYellow);
            this.wildcards.push(all);
        }
    }

    initializeRentCards() {
        let all = new Card("Rent", "", 3, CardType.Rent, [PropertyType.Green, PropertyType.DarkBlue, PropertyType.LightBlue, PropertyType.Red, PropertyType.Railroad, PropertyType.Yellow, PropertyType.Orange, PropertyType.Brown, PropertyType.Purple, PropertyType.Utility]);
        let darkBlueAndGreen = new Card("Rent", "", 1, CardType.Rent, [PropertyType.DarkBlue, PropertyType.Green]);
        let lightBlueAndBrown = new Card("Rent", "", 1, CardType.Rent, [PropertyType.LightBlue, PropertyType.Brown]);
        let purpleAndOrange = new Card("Rent", "", 1, CardType.Rent, [PropertyType.Purple, PropertyType.Orange]);
        let railroadAndUtility = new Card("Rent", "", 1, CardType.Rent, [PropertyType.Railroad, PropertyType.Utility]);
        let redAndYellow = new Card("Rent", "", 1, CardType.Rent, [PropertyType.Red, PropertyType.Yellow]);
        var i;
        for (i = 0; i < 2; i++) {
            this.rentCards.push(purpleAndOrange);
            this.rentCards.push(railroadAndUtility);
            this.rentCards.push(darkBlueAndGreen);
            this.rentCards.push(lightBlueAndBrown);
            this.rentCards.push(redAndYellow);
        }
        for (i = 0; i < 3; i++) {
            this.rentCards.push(all);
        }
    }

    initializeMoneyCards() {
        let oneM = new Card("1M", "", 1, CardType.Money, []);
        let twoM = new Card("2M", "", 2, CardType.Money, []);
        let threeM = new Card("3M", "", 3, CardType.Money, []);
        let fourM = new Card("4M", "", 4, CardType.Money, []);
        let fiveM = new Card("5M", "", 5, CardType.Money, []);
        let tenM = new Card("10M", "", 10, CardType.Money, []);
        var i;
        this.moneyCards.push(tenM);
        for (i = 0; i < 2; i++) {
            this.moneyCards.push(fiveM);
        }
        for (i = 0; i < 3; i++) {
            this.moneyCards.push(fourM);
            this.moneyCards.push(threeM);
        }
        for (i = 0; i < 5; i++) {
            this.moneyCards.push(twoM);
        }
        for (i = 0; i < 6; i++) {
            this.moneyCards.push(oneM);
        }
    }

    createDeck() {
        var i;
        for (i = 0; i < this.actionCards.length; i++) {
            this.cards.push(this.actionCards[i]);
        }
        
        console.log("Property cards length: " + this.propertyCards.length);
        for (i = 0; i < this.propertyCards.length; i++) {
            this.cards.push(this.propertyCards[i]);
        }

        console.log("Wildcards length: " + this.wildcards.length);
        for (i = 0; i < this.wildcards.length; i++) {
            this.cards.push(this.wildcards[i]);
        }

        console.log("Rent cards length: " + this.rentCards.length);
        for (i = 0; i < this.rentCards.length; i++) {
            this.cards.push(this.rentCards[i]);
        }

        console.log("Money cards length: " + this.moneyCards.length);
        for (i = 0; i < this.moneyCards.length; i++) {
            this.cards.push(this.moneyCards[i]);
        }
        this.cards = this.shuffleArray(this.cards);
    }

    shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
    }
}