import { Card } from "./Card";

export class MoneyCard extends Card {
    imageLocation: string;

    constructor(title: string, value: number) {
        super(title, value);
        this.imageLocation = "assets/imgs/money_cards/" + title + ".png";
    }
}