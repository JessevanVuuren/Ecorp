import { Component, OnInit, Input } from '@angular/core';
import { Cart } from 'src/models/Cart.model';
import { Server } from 'src/models/Server.model';
import { CartService } from 'src/service/cart.service';

@Component({
  selector: 'app-server-card',
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.scss']
})
export class ServerCardComponent implements OnInit{
  @Input("server") server?:Server;
  inShoppingCart = false

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.cart.shoppingCart.subscribe(items => {
      items.map(item => {
        if (item.serverID === this.server?.id) this.inShoppingCart = true
      })
    })

    this.cart.removedItem.subscribe(item => {
        if (item.serverID === this.server?.id) this.inShoppingCart = false
    })

    
  }

  addToShoppingCart() {
    this.inShoppingCart = false
    const cart: Cart = {
      "amount": 1,
      "serverID": this.server?.id 
    }
    this.cart.addOrRemoveItem(cart)
  }
}
