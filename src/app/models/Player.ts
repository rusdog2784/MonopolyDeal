import { Card } from "./Card";

export class Player {
    firstName: string;
    lastName: string;
    value: number;
    hand: Card[];
    money: Card[];
    activeCards: Card[];
    turnCount: number;

    constructor(firstName: string, lastName: string, value: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.value = value;
        this.hand = [];
        this.money = [];
        this.activeCards = [];
        this.turnCount = 0;
    }
}