import { Component, Input, EventEmitter, Output, Optional, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Server } from 'src/models/Server.model';
import { HttpService } from 'src/service/http.service';
import { ServerService } from 'src/service/server.service';

@Component({
  selector: 'app-single-server',
  templateUrl: './single-server.component.html',
  styleUrls: ['./single-server.component.scss'],
})
export class SingleServerComponent {
  @Input("server") server:Server
  @Output("edit") edit: EventEmitter<number> = new EventEmitter();

  constructor(@Optional() private dialogService: NbDialogService, private http:HttpService, private serverS: ServerService) {}

  editThis () {
    this.edit.next(this.server.id)
  }

  sureDelete(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {})
  }

  deleteThis() {
    this.http.delete<null>("/api/server/delete", this.server.id).subscribe(r => {
      this.serverS.getAllServers()
    })
  }
}
