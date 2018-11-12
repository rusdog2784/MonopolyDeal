import { Card } from "./Card";

export class Player {
    id: string;
    firstName: string;
    lastName: string;
    value: number;
    hand: Card[];
    moneyCards: any;
    activeCards: any;
    turnCount: number;
    myTurn: boolean;
    printMoneyCards: Card[];
    printActiveCards: Card[];
    
    constructor(firstName: string, lastName: string, value: number) {
        this.id = this.getRandomID();
        this.firstName = firstName;
        this.lastName = lastName;
        this.value = value;
        this.hand = [];
        this.moneyCards = {};
        this.activeCards = {};
        this.turnCount = 0;
        this.myTurn = false;
        this.printMoneyCards = [];
        this.printActiveCards = [];
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

    addMoneyCard(card) {
        this.value += card.value;
        if (this.moneyCards[card.value]) {
            this.moneyCards[card.value].push(card);
        } else {
            this.moneyCards[card.value] = [card];
        }
        this.organizeMoneyCards();
        console.log("addMoneyCard:");
        console.log(this.moneyCards);
    }

    organizeMoneyCards() {
        if (this.moneyCards.length <= 1) {
            return;
        }
        var cards = [];
        for (let key in this.moneyCards) {
            cards.push(this.moneyCards[key]);
        }
        this.printMoneyCards = cards;
    }

    addActiveCard(card, type) {
        if (this.activeCards[type]) {
            this.activeCards[type].push(card);
        } else {
            this.activeCards[type] = [card];
        }
        this.organizeActiveCards();
    }

    organizeActiveCards() {
        if (this.activeCards.length <= 1) {
            return;
        }
        var cards = [];
        for (let key in this.activeCards) {
            cards.push(this.activeCards[key]);
        }
        this.printActiveCards = cards;
    }
}