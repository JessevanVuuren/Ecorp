import { Component, OnInit } from '@angular/core';
import { JwtToken } from 'src/models/jwtToken.model';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private auth: AuthService) { }

  userData: JwtToken

  ngOnInit(): void {
    this.userData = this.auth.decodeJWTToken(this.auth.getToken())
  }

  logout() {
    this.auth.logout()
  }

}
