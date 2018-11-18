import { Component } from '@angular/core';
import { NavParams, ViewController, PopoverController } from 'ionic-angular';
import { SocketProvider } from '../../providers/socket/socket';

@Component({
    template: `
        <ion-list radio-group style="height: 300px">
            <ion-row *ngFor="let action of opponents_actions">
                <p style="padding-left: 10px; padding-right: 10px;">{{action}}</p>
            </ion-row>
        </ion-list>
    `
})
export class OpponentActionsPopover {
    opponents_actions: String[];

    constructor(private navParams: NavParams, private viewCtrl: ViewController) {
    }

    ngOnInit() {
        if (this.navParams.data) {
            this.opponents_actions = this.navParams.data.opponents_actions;
        }
    }
}