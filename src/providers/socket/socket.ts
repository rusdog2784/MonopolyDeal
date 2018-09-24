//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { DataProvider } from '../../providers/data/data';

@Injectable()
export class SocketProvider {

  constructor(private socket: Socket, public dataProvider: DataProvider) {
    console.log('Hello SocketProvider Provider');
  }

  connect() {
    this.socket.connect();
    this.socket.emit('player-entered', this.dataProvider.getPlayer());
  }

  subscribeTo(subscription:string) {
    let observable = new Observable(observer => {
      this.socket.on(subscription, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  emit(eventName:string, data:any) {
    console.log("Emitting: " + eventName + ", Data:");
    console.log(data);
    this.socket.emit(eventName, data);
  }

}
