export class Card {
    title: string;
    value: number;
    imageLocation: string;

    constructor(title: string, value: number) {
        this.title = title;
        this.value = value;
        this.imageLocation = "assets/imgs/played_cards.png";
    }

    onPlay() {
        console.log("Playing " + this.title);
    }
}