import { Component, Input, EventEmitter, Output, Optional, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Server } from 'src/models/Server.model';

@Component({
  selector: 'app-single-server',
  templateUrl: './single-server.component.html',
  styleUrls: ['./single-server.component.scss'],
})
export class SingleServerComponent {
  @Input("server") server:Server
  @Output("edit") edit: EventEmitter<number> = new EventEmitter();

  constructor(@Optional() private dialogService: NbDialogService) {}

  editThis () {
    this.edit.next(this.server.id)
  }

  sureDelete(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {})
  }

  deleteThis() {
    console.log("delete" + this.server.name)
  }
}
