import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/models/Cart.model';
import { Server } from 'src/models/Server.model';
import { CartService } from 'src/service/cart.service';
import { ServerService } from 'src/service/server.service';

@Component({
  selector: 'app-shopping-cart',
  host: { style:"width:100%" },
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  items?: Cart[]
  servers?:Server[]
  total = 0
  vat = 0
  service = 0

  constructor(private cartS: CartService, private serversS: ServerService) { }


  ngOnInit(): void {
    this.cartS.removedItem.subscribe(item => {
      this.total = 0
    })

    this.cartS.shoppingCart.subscribe(items => {
      this.items = items
      this.total = 0
      this.calcTotal(items)
    })
  }


  calcTotal(items: Cart[]) {
    items.map(item => {
      if (item.price && item.amount) this.total += item.price * item.amount
    })
    this.service = Math.round(this.total / 1000 + ((this.total / 100) * 8))
    this.vat = Math.round((this.total / 100) * 15)
  }

}
