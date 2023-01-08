import { CartService } from 'src/service/cart.service';
import { AuthService } from 'src/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeRoute?:string
  amountShoppingCart = 0
  showHamburger = false
  showAdminPage = false

  constructor(private router:Router, private cart:CartService, private auth:AuthService) {}
  
  ngOnInit(): void {
    this.activeRoute = this.router.url
    this.cart.getItems()

    this.cart.shoppingCart.subscribe(items => {
      this.amountShoppingCart = items.length
    })

    this.auth.userIsAdmin.subscribe((value:boolean) => {
      this.showAdminPage = value
      console.log(value)
    })
  }

  switchPage(route:string) {
    this.router.navigate([route])
    this.activeRoute = route
    this.showHamburger = false
  }

  toggleHamburger() {
    this.showHamburger = !this.showHamburger
  }

}
