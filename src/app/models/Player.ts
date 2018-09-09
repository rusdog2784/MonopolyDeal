import { Card } from "./Card";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { PropertyCard } from "./PropertyCard";
import { Wildcard } from "./Wildcard";
import { PropertyType } from "./PropertyType";

export class Player {
    firstName: string;
    lastName: string;
    value: number;
    hand: Card[];
    moneyCards: Card[];
    activeCards: any;
    turnCount: number;

    constructor(firstName: string, lastName: string, value: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.value = value;
        this.hand = [];
        this.moneyCards = [];
        this.activeCards = {};
        this.turnCount = 0;
    }

    isTurnOver() {
        if (this.turnCount >= 3) {
            this.turnCount = 0;
            return true;
        } else {
            return false;
        }
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