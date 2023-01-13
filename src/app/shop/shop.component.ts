import { ServerService } from 'src/service/server.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Server } from 'src/models/Server.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  servers: Server[]
  result: Server[]
  
  constructor(private serverService: ServerService, private route:ActivatedRoute) { }


  updateQuery(text:any) {
    this.result = this.servers.filter((server: Server) => server.name.toLowerCase().includes(text.nativeElement.value.toLowerCase()))
  }

  ngOnInit(): void {
    this.serverService.getAllServers()

    this.serverService.serversSubject.subscribe(data => {
      this.servers = data
      this.result = data
    })
  }
}
