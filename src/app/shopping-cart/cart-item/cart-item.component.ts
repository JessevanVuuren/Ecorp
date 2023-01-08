import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/models/Cart.model';
import { CartService } from 'src/service/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input("item") item?: Cart;
  amount = 0

  constructor(private cartS: CartService) { }

  ngOnInit(): void {
    if (this.item?.amount) {
      this.amount = this.item.amount
    }
  }

  updateAmount() {
    if (this.item) {
      this.cartS.setCartAmount(this.item, this.amount)
    }
  }

  amountUp() {
    this.amount += 1
    this.updateAmount()
  }


  amountDown() {
    if (this.amount <= 1) return
    this.amount += -1
    this.updateAmount()
  }

  removeProduct() {
    if (this.item) {
      this.cartS.addOrRemoveItem(this.item)
    }
  }
}
