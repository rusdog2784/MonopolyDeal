export class Card {
    title: string;
    value: number;
    imageLocation: string;
    cardType: string;

    constructor(title: string, value: number) {
        this.title = title;
        this.value = value;
        this.imageLocation = "assets/imgs/played_cards.png";
        this.cardType = "";
    }

    onPlay() {
        console.log("Playing " + this.title);
    }
    
    setCardType(type:string) {
        this.cardType = type;
    }
}