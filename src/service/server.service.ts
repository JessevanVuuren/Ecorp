import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Server } from "src/models/Server.model";
import { HttpService } from "./http.service";

@Injectable({providedIn: 'root'})
export class ServerService {
  public servers?: Server[]

  public serversSubject = new BehaviorSubject<Server[]>([])

  constructor(private http: HttpService) {}

  getAllServers() {
    this.http.getData<Server>("/api/server").subscribe((data) => {
      this.serversSubject.next(data)
      this.servers = data
    })
  }

  getServerNames():string[] {
    const names = []
    this.servers.map(e => names.push(e.name))
    return names
  }
}