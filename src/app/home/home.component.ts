import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/service/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeRoute?:string

  constructor(private router:Router, private servers: ServerService) {}
  
  ngOnInit(): void {
    this.activeRoute = this.router.url
  }


  switchPage(route:string) {
    this.router.navigate([route])
    this.activeRoute = route
  }

}
