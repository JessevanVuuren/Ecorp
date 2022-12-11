import { Component, EventEmitter, Input } from '@angular/core';
import { Server } from 'src/models/Server.model';

@Component({
  selector: 'app-server-card',
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.scss']
})
export class ServerCardComponent {
  @Input("server") server?:Server;

}
