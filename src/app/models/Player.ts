import { Card } from "./Card";

export class Player {
    name: string;
    cards: Card[];

    constructor(name: string) {
        this.name = name;
        this.cards = [];
    }
}