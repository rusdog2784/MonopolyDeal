import { Card } from "./Card";

export class ActionCard extends Card {
    description: string;
    imageLocation: string;

    constructor(title: string, description: string, value: number) {
        super(title, value);
        this.description = description;
        var imageName = title.replace(" ", "");
        imageName = imageName.replace(" ", "");
        this.imageLocation = "assets/imgs/action_cards/" + imageName + ".png";
        super.setCardType("ActionCard");
    }

}