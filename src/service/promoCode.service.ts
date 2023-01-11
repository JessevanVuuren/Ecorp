import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PromoCode } from "src/models/PromoCode";
import { HttpService } from "./http.service";

@Injectable({ providedIn: 'root' })
export class PromoCodeService {

  public promoCodeSubject = new BehaviorSubject<PromoCode[]>([])
  public promoCode: PromoCode[]

  constructor(private http: HttpService) { }

  getAllPromoCodes() {
    this.http.getData<PromoCode>("/api/promocode").subscribe((data) => {
      this.promoCodeSubject.next(data)
      this.promoCode = data
    })
  }

  updatePromo(id: number, name: string, amount: number) {
    const promo: PromoCode = {
      "amountoff": amount,
      "id": id,
      "name": name
    }

    this.http.update("/api/promocode/update", promo).subscribe(() => {
      this.getAllPromoCodes()
    })
  }

  createNewPromo(name: string, amount: number) {
    const promo: PromoCode = {
      "amountoff": amount,
      "id": null,
      "name": name
    }

    this.http.sendData("/api/promocode/new", promo).subscribe(() => {
      this.getAllPromoCodes()
    })
  }
}