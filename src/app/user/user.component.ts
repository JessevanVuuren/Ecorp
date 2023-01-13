import { AuthService } from 'src/service/auth.service';
import { HttpService } from 'src/service/http.service';
import { JwtToken } from 'src/models/jwtToken.model';
import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/models/Orders';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  orders: Orders[]
  userData: JwtToken
  
  constructor(private auth: AuthService, private http: HttpService) { }

  ngOnInit(): void {
    const id = this.auth.decodeJWTToken(this.auth.getToken()).id
    this.http.getData<Orders>("/api/order/" + id).subscribe(order => this.orders = order)
    this.userData = this.auth.decodeJWTToken(this.auth.getToken())
  }

  logout() {
    this.auth.logout()
  }

}
