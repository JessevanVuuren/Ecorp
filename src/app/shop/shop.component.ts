import { Component, OnInit } from '@angular/core';
import { Server } from 'src/models/Server.model';
import { HttpService } from 'src/service/http.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{

  constructor (private http:HttpService) {}


  ngOnInit(): void {
    this.http.getData<Server[]>("/api/server").subscribe((data) => {
      console.log(data)
    })
  }


}
