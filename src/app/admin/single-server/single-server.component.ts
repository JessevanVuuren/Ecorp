import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Server } from 'src/models/Server.model';

@Component({
  selector: 'app-single-server',
  templateUrl: './single-server.component.html',
  styleUrls: ['./single-server.component.scss']
})
export class SingleServerComponent {
  @Input("server") server:Server
  @Output("edit") edit: EventEmitter<number> = new EventEmitter();

  editThis () {
    this.edit.next(this.server.id)
  }
}
