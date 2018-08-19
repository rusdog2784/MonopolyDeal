import { Card } from "./Card";
import { PropertyType } from "./PropertyType";

export class Wildcard extends Card {
    types: PropertyType[];
    imageLocation: string;

    constructor(title: string, value: number, types: PropertyType[]) {
        super(title, value);
        this.types = types;
        var imageName: string;
        if (this.types.length > 1) {
            imageName = this.types[0] + "&" + this.types[1];
        } else {
            imageName = this.types[0];
        }
        this.imageLocation = "assets/imgs/wildcards/" + imageName + ".png";
    }
}