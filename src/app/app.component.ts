import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Ecorp';

  name?:string

  constructor(private auth:AuthService) {}

  ngOnInit() {
    console.log(environment.title)
    const token = localStorage.getItem("auth_key")
    if (token) this.name = this.auth.decodeJWTToken(token).name

    
  }
}
