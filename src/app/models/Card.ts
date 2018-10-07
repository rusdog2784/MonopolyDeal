import { CardType } from "./CardType";
import { PropertyType } from "./PropertyType";

export class Card {
    title: string;
    description: string;
    value: number;
    imageLocation: string;
    cardType: CardType;
    propertyTypes: PropertyType[];

    constructor(title: string, description: string, value: number, cardType: CardType, propertyTypes:PropertyType[]) {
        this.title = title;
        this.description = description;
        this.value = value;
        this.cardType = cardType;
        this.propertyTypes = propertyTypes;
        this.setImageLocation();
    }

    onPlay() {
        console.log("Playing " + this.title);
    }

    setImageLocation() {
        var imageName = this.title.replace(" ", "");
        imageName = imageName.replace(" ", "");
        imageName = imageName.replace(" ", "");
        if (this.cardType == CardType.Action) {
            this.imageLocation = "assets/imgs/action_cards/" + imageName + ".png";
        } else if (this.cardType == CardType.Property) {
            this.imageLocation = "assets/imgs/property_cards/" + imageName + ".png";
        } else if (this.cardType == CardType.Money) {
            this.imageLocation = "assets/imgs/money_cards/" + this.title + ".png";
        } else if (this.cardType == CardType.Rent) {
            if (this.propertyTypes.length == 2) {
                imageName = this.propertyTypes[0] + "&" + this.propertyTypes[1];
            } else {
                imageName = "All";
            }
            this.imageLocation = "assets/imgs/rent_cards/" + imageName + ".png";
        } else if (this.cardType == CardType.Wildcard) {
            if (this.propertyTypes.length == 2) {
                imageName = this.propertyTypes[0] + "&" + this.propertyTypes[1];
            } else {
                imageName = "All";
            }
            this.imageLocation = "assets/imgs/wildcards/" + imageName + ".png";
        } else {
            this.imageLocation = "assets/imgs/played_cards.png";
        }
    }
}