import { Card } from "./Card";

export class Player {
    id: string;
    firstName: string;
    lastName: string;
    value: number;
    hand: Card[];
    moneyCards: Card[];
    activeCards: any;
    turnCount: number;
    myTurn: boolean;
    
    constructor(firstName: string, lastName: string, value: number) {
        this.id = this.getRandomID();
        this.firstName = firstName;
        this.lastName = lastName;
        this.value = value;
        this.hand = [];
        this.moneyCards = [];
        this.activeCards = {};
        this.turnCount = 0;
        this.myTurn = false;
    }

    getRandomID() {
        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        return randLetter + Date.now();
    }

    canPlay() {
        if (this.isMyTurn() && !this.outOfMoves()) {
            return true;
        }
        return false;
    }

    isMyTurn() {
        return this.myTurn;
    }

    outOfMoves() {
        return this.turnCount == 3;
    }

    organizeMoneyCards() {
        if (this.moneyCards.length <= 1) {
            return;
        }
        this.moneyCards.sort(function(a, b) { return a.value - b.value; });
    }

    addActiveCard(card, type) {
        if (this.activeCards[type]) {
            this.activeCards[type].push(card);
        } else {
            this.activeCards[type] = [card];
        }
    }

    getActiveCards() {
        var cards = [];
        for (let key in this.activeCards) {
            cards.push(this.activeCards[key]);
        }
        return cards;
    }
}