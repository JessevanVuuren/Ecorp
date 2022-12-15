import { Component, Input } from '@angular/core';
import { Cart } from 'src/models/Cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent  {
  @Input("item") item?:Cart;
}
