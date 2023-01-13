import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/service/cart.service';
import { Server } from 'src/models/Server.model';
import { Cart } from 'src/models/Cart.model';

@Component({
  selector: 'app-server-card',
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.scss']
})
export class ServerCardComponent implements OnInit {
  @Input("server") server?: Server;
  @Input("demo") demo?: boolean = false
  
  inShoppingCart = false
  cartItem: Cart
  amount = 0;

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.cart.shoppingCart.subscribe(items => {
      items.map(item => {
        if (item.serverID === this.server?.id) {
          this.inShoppingCart = true
          this.cartItem = item
        }
      })
    })

    this.cart.currentList.map(item => {
      if (item.serverID === this.server.id) this.amount = item.amount
    })

    this.cart.removedItem.subscribe(item => {
      if (item.serverID === this.server?.id) this.inShoppingCart = false
    })
  }

  addToShoppingCart() {
    this.inShoppingCart = false
    const cart: Cart = {
      amount: 1,
      serverID: this.server?.id,
      name: this.server?.name,
      price: this.server?.price,
      ram: this.server?.ram,
      cpu: this.server?.cpu,
      space: this.server?.space,
      stype: this.server?.stype
    }
    this.cart.addOrRemoveItem(cart)
  }

  updateAmount() {
    if (this.cartItem) {
      this.cart.setCartAmount(this.cartItem, this.amount)
    }
  }

  amountUp() {
    if (this.amount == 0) {
      this.addToShoppingCart()
    }
    this.amount += 1
    this.updateAmount()
  }


  amountDown() {
    if (this.amount <= 0) return
    this.amount += -1
    if (this.amount == 0) {
      this.addToShoppingCart()
    }
    this.updateAmount()
  }
}
