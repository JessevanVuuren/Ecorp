import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/service/cart.service';
import { ServerService } from 'src/service/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeRoute?:string
  amountShoppingCart = 0

  constructor(private router:Router, private servers: ServerService, private cart:CartService) {}
  
  ngOnInit(): void {
    this.activeRoute = this.router.url
    this.cart.getItems()

    this.cart.shoppingCart.subscribe(items => {
      this.amountShoppingCart = items.length
    })
  }

  switchPage(route:string) {
    this.router.navigate([route])
    this.activeRoute = route
  }

}
