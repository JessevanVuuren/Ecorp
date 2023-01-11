import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/models/Cart.model';
import { Orders } from 'src/models/Orders';
import { Server } from 'src/models/Server.model';
import { AuthService } from 'src/service/auth.service';
import { CartService } from 'src/service/cart.service';
import { HttpService } from 'src/service/http.service';
import { ServerService } from 'src/service/server.service';

@Component({
  selector: 'app-shopping-cart',
  host: { style: "width:100%" },
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  items?: Cart[]
  servers?: Server[]
  total = 0
  vat = 0
  service = 0

  constructor(private cartS: CartService, private serversS: ServerService, private http: HttpService, private auth: AuthService) { }


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

  checkout() {
    const orders: Orders[] = []
    this.items.map(cart => {
      const order: Orders = {
        "amount": cart.amount,
        "server": cart.name,
        "userid": this.auth.getID()
      }

      orders.push(order)
    })

    if (orders.length > 0) {
      this.http.sendData<Orders>("/api/order", orders).subscribe()
      this.cartS.clearCart()
      this.total = 0
      this.vat = 0
      this.service = 0
      this.items = []
      this.servers = []
    }
  }


  calcTotal(items: Cart[]) {
    items.map(item => {
      if (item.price && item.amount) this.total += item.price * item.amount
    })
    this.service = Math.round(this.total / 1000 + ((this.total / 100) * 8))
    this.vat = Math.round((this.total / 100) * 15)
  }

}
