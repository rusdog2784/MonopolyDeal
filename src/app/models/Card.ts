import { CardType } from "./CardType";
import { PropertyType } from "./PropertyType";
import { ActionCardTitles } from './ActionCardTitles';

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

    actionCardPlayed(actionType: ActionCardTitles) {
        console.log("Playing Action Card: " + this.title);
        switch(actionType) {
            case ActionCardTitles.DealBreaker:
                //Display players who have monopolies, let player choose 1 to steal monopoly
                break;
            case ActionCardTitles.JustSayNo:
                //Allows player to stop another player from taking an action on them
                break;
            case ActionCardTitles.SlyDeal:
                //Let player choose 1 property to take from another player
                break;
            case ActionCardTitles.ForcedDeal:
                //First make player choose 1 of their properties they want to give up, then let player choose 1 property to trade from another player
                break;
            case ActionCardTitles.DebtCollector:
                //Pick 1 player to pay $5M
                break;
            case ActionCardTitles.ItsMyBirthday:
                //All players have to pay $2M
                break;
            case ActionCardTitles.House:
                //Add onto full monopoly or monetize
                break;
            case ActionCardTitles.Hotel:
                //Add onto full monopoly or monetize
                break;
            case ActionCardTitles.DoubleTheRent:
                //Must be played with a rent card. Doubles the rent for the selected property.
                break;
            default:
                break;
        }
    }
}