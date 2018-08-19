import { Card } from "./Card";

export class Player {
    name: string;
    value: number;
    hand: Card[];
    money: Card[];
    activeCards: Card[];
    turnCount: number;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
        this.hand = [];
        this.money = [];
        this.activeCards = [];
        this.turnCount = 0;
    }
}