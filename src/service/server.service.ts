import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Server } from "src/models/Server.model";
import { HttpService } from "./http.service";

@Injectable({providedIn: 'root'})
export class ServerService {

  public serversSubject = new Subject<Server[]>
  public servers?: Server[]

  constructor(private http: HttpService) {}



  getAllServers() {
    this.http.getData<Server>("/api/server").subscribe((data) => {
      this.serversSubject.next(data)
      this.servers = data
    })
  }
}