import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServerService } from 'src/service/server.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Ecorp';

  name?:string

  constructor(private auth:AuthService, private servers:ServerService) {}

  ngOnInit() {
    console.log(environment.title)
    const token = localStorage.getItem("auth_key")
    if (token) this.name = this.auth.decodeJWTToken(token).name

    this.servers.getAllServers()
  }
}
