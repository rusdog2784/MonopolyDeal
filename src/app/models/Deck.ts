import { Card } from "./Card";
import { ActionCard } from "./ActionCard";
import { PropertyCard } from "./PropertyCard";
import { PropertyType } from "./PropertyType";
import { Wildcard } from "./Wildcard";
import { RentCard } from "./RentCard";
import { MoneyCard } from "./MoneyCard";

export class Deck {
    cards: Card[];
    actionCards: ActionCard[];
    propertyCards: PropertyCard[];
    wildcards: Wildcard[];
    rentCards: RentCard[];
    moneyCards: MoneyCard[];

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
        let dealBreaker = new ActionCard("Deal Breaker", "Steals a complete set of properties from any player. (Includes any buildings) Play into center to use.", 5);
        let justSayNo = new ActionCard("Just Say No", "Use any time when an action card is played against you. Play into center to use.", 4);
        let slyDeal = new ActionCard("Sly Deal", "Steal a property from the player of your choice. (Cannot be part of a full set) Play into center to use.", 3);
        let forcedDeal = new ActionCard("Forced Deal", "Swap any property with another player. (Cannot be part of a full set) Play into center to use.", 3);
        let debtCollector = new ActionCard("Debt Collector", "Force any player to pay you 5M. Play into center to use.", 3);
        let itsMyBirthday = new ActionCard("Its My Birthday", "All players give you 2M as a 'gift'. Play into center to use.", 2);
        let passGo = new ActionCard("Pass Go", "Draw 2 extra cards. Play into center to use.", 1);
        let house = new ActionCard("House", "Add onto any full set you own to add 3M to the rent value. (Except railroads and Utility)", 3);
        let hotel = new ActionCard("Hotel", "Add onto any full set you own to add 4M to the rent value. (Except railroads and Utility)", 4);
        let doubleTheRent = new ActionCard("Double The Rent", "Needs to played with a rent card. Play into center to use.", 1);
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
        let northCarolinaAve = new PropertyCard("North Carolina Avenue", 4, PropertyType.Green);
        let pacificAvenue = new PropertyCard("Pacific Avenue", 4, PropertyType.Green);
        let pennsylvaniaAvenue = new PropertyCard("Pennsylvania Avenue", 4, PropertyType.Green);
        this.propertyCards.push(northCarolinaAve);
        this.propertyCards.push(pacificAvenue);
        this.propertyCards.push(pennsylvaniaAvenue);
        let boardwalk = new PropertyCard("Boardwalk", 4, PropertyType.DarkBlue);
        let parkPlace = new PropertyCard("Park Place", 4, PropertyType.DarkBlue);
        this.propertyCards.push(boardwalk);
        this.propertyCards.push(parkPlace);
        let connecticutAvenue = new PropertyCard("Connecticut Avenue", 1, PropertyType.LightBlue);
        let orientalAvenue = new PropertyCard("Oriental Avenue", 1, PropertyType.LightBlue);
        let vermontAvenue = new PropertyCard("Vermont Avenue", 1, PropertyType.LightBlue);
        this.propertyCards.push(connecticutAvenue);
        this.propertyCards.push(orientalAvenue);
        this.propertyCards.push(vermontAvenue);
        let kentuckyAvenue = new PropertyCard("Kentucky Avenue", 3, PropertyType.Red);
        let indianaAvenue = new PropertyCard("Indiana Avenue", 3, PropertyType.Red);
        let illinoisAvenue = new PropertyCard("Illinois Avenue", 3, PropertyType.Red);
        this.propertyCards.push(kentuckyAvenue);
        this.propertyCards.push(indianaAvenue);
        this.propertyCards.push(illinoisAvenue);
        let shortLine = new PropertyCard("Short Line", 2, PropertyType.Railroad);
        let boRailroad = new PropertyCard("B & O Railroad", 2, PropertyType.Railroad);
        let readingRailroad = new PropertyCard("Reading Railroad", 2, PropertyType.Railroad);
        let pennsylvaniaRailroad = new PropertyCard("Pennsylvania Railroad", 2, PropertyType.Railroad);
        this.propertyCards.push(shortLine);
        this.propertyCards.push(boRailroad);
        this.propertyCards.push(readingRailroad);
        this.propertyCards.push(pennsylvaniaRailroad);
        let ventnorAvenue = new PropertyCard("Ventnor Avenue", 3, PropertyType.Yellow);
        let marvinGardens = new PropertyCard("Marvin Gardens", 3, PropertyType.Yellow);
        let atlanticAvenue = new PropertyCard("Atlantic Avenue", 3, PropertyType.Yellow);
        this.propertyCards.push(ventnorAvenue);
        this.propertyCards.push(marvinGardens);
        this.propertyCards.push(atlanticAvenue);
        let newYorkAvenue = new PropertyCard("New York Avenue", 2, PropertyType.Orange);
        let stJamesPlace = new PropertyCard("St James Place", 2, PropertyType.Orange);
        let tennesseeAvenue = new PropertyCard("Tennessee Avenue", 2, PropertyType.Orange);
        this.propertyCards.push(newYorkAvenue);
        this.propertyCards.push(stJamesPlace);
        this.propertyCards.push(tennesseeAvenue);
        let balticAvenue = new PropertyCard("Baltic Avenue", 1, PropertyType.Brown);
        let mediterraneanAvenue = new PropertyCard("Mediterranean Avenue", 1, PropertyType.Brown);
        this.propertyCards.push(balticAvenue);
        this.propertyCards.push(mediterraneanAvenue);
        let stCharlesPlace = new PropertyCard("St Charles Place", 2, PropertyType.Purple);
        let virginiaAvenue = new PropertyCard("Virginia Avenue", 2, PropertyType.Purple);
        let statesAvenue = new PropertyCard("States Avenue", 2, PropertyType.Purple);
        this.propertyCards.push(stCharlesPlace);
        this.propertyCards.push(virginiaAvenue);
        this.propertyCards.push(statesAvenue);
        let waterWorks = new PropertyCard("Water Works", 2, PropertyType.Utility);
        let electricCompany = new PropertyCard("Electric Company", 2, PropertyType.Utility);
        this.propertyCards.push(waterWorks);
        this.propertyCards.push(electricCompany);
    }

    initializeWildcards() {
        let all = new Wildcard("Property Wild Card", 0, [PropertyType.All]);
        let darkBlueAndGreen = new Wildcard("Property Wild Card", 4, [PropertyType.DarkBlue, PropertyType.Green]);
        let lightBlueAndBrown = new Wildcard("Property Wild Card", 1, [PropertyType.LightBlue, PropertyType.Brown]);
        let lightBlueAndRailroad = new Wildcard("Property Wild Card", 4, [PropertyType.LightBlue, PropertyType.Railroad]);
        let purpleAndOrange = new Wildcard("Property Wild Card", 2, [PropertyType.Purple, PropertyType.Orange]);
        let railroadAndGreen = new Wildcard("Property Wild Card", 4, [PropertyType.Railroad, PropertyType.Green]);
        let railroadAndUtility = new Wildcard("Property Wild Card", 2, [PropertyType.Railroad, PropertyType.Utility]);
        let redAndYellow = new Wildcard("Property Wild Card", 3, [PropertyType.Red, PropertyType.Yellow]);
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
        let all = new RentCard("Rent", 3, [PropertyType.All]);
        let darkBlueAndGreen = new RentCard("Rent", 1, [PropertyType.DarkBlue, PropertyType.Green]);
        let lightBlueAndBrown = new RentCard("Rent", 1, [PropertyType.LightBlue, PropertyType.Brown]);
        let purpleAndOrange = new RentCard("Rent", 1, [PropertyType.Purple, PropertyType.Orange]);
        let railroadAndUtility = new RentCard("Rent", 1, [PropertyType.Railroad, PropertyType.Utility]);
        let redAndYellow = new RentCard("Rent", 1, [PropertyType.Red, PropertyType.Yellow]);
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
        let oneM = new MoneyCard("1M", 1);
        let twoM = new MoneyCard("2M", 2);
        let threeM = new MoneyCard("3M", 3);
        let fourM = new MoneyCard("4M", 4);
        let fiveM = new MoneyCard("5M", 5);
        let tenM = new MoneyCard("10M", 10);
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