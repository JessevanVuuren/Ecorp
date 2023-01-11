import { Component, Input } from '@angular/core';
import { Orders } from 'src/models/Orders';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent {
  @Input("order") order:Orders
}
