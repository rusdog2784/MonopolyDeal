import { Card } from "./Card";

export class Player {
    firstName: string;
    lastName: string;
    value: number;
    hand: Card[];
    moneyCards: Card[];
    activeCards: Card[];
    turnCount: number;

    constructor(firstName: string, lastName: string, value: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.value = value;
        this.hand = [];
        this.moneyCards = [];
        this.activeCards = [];
        this.turnCount = 0;
    }

    organizeMoneyCards() {
        if (this.moneyCards.length <= 1) {
            return;
        }

        this.moneyCards.sort(function(a, b) { return a.value - b.value; });
    }
}