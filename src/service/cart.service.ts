import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Subject, timestamp } from "rxjs";
import { Cart } from "src/models/Cart.model";


@Injectable({ providedIn: 'root' })
export class CartService {
  shoppingCart = new BehaviorSubject<Cart[]>([])
  removedItem = new Subject<Cart>
  currentList?:Cart[]

  constructor() {
    this.getItems()
  }

  getItems(): Cart[] {
    let items: Cart[] = []
    const shoppingContent = localStorage.getItem("cart")
    if (shoppingContent === null) {
      localStorage.setItem("cart", JSON.stringify([]))
    }
    else {
      items = JSON.parse(shoppingContent) as Cart[]
      this.setItems(items)
    }
    return items
  }

  clearCart() {
    localStorage.removeItem("cart")
    this.shoppingCart.next([])
    this.currentList = []
  }

  setItems(carts: Cart[]) {
    this.currentList = carts
    this.shoppingCart.next(carts)
  }

  saveItems(card: Cart[]) {
    localStorage.setItem("cart", JSON.stringify(card))
    this.setItems(card)
  }

  addOrRemoveItem(item: Cart) {
    // good luck reading this
    // it just adds a item in is not already in shopping cart
    // and removes if is
    let items = this.getItems()
    let index = -1
    items.map((e, i) => { if (e.serverID === item.serverID) index = i })
    if (index > -1) {
      items = items.filter((e) => e.serverID !== item.serverID)
      this.removedItem.next(item)
    }
    else items.push(item)
    this.saveItems(items)
  }

  setCartAmount(item:Cart, amount:number) {
    let items = this.getItems()
    items.map((cart:Cart, index:number) => {
      if (item.serverID === cart.serverID) {
        cart.amount = amount
      }
    })
    this.saveItems(items)
  }
}