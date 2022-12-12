import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Server } from 'src/models/Server.model';
import { ServerService } from 'src/service/server.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  servers?: Server[]

  constructor(private serverService: ServerService, private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.serverService.serversSubject.subscribe(data => {
      this.servers = data
    })
  }
}
