import { Card } from "./Card";
import { PropertyType } from "./PropertyType";

export class PropertyCard extends Card {
    type: PropertyType;
    imageLocation: string;

    constructor(title: string, value: number, type: PropertyType) {
        super(title, value);
        this.type = type;
        var imageName = title.replace(" ", "");
        imageName = imageName.replace(" ", "");
        this.imageLocation = "assets/imgs/property_cards/" + imageName + ".png";
    }
}