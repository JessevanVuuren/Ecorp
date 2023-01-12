import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
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

  getAllNames():string[] {
    const names = []
    this.promoCode.map(e => names.push(e.name))
    return names
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

  checkCode(code:string):Observable<string> {
    return this.http.getSingleData<string>("/api/promocode/check/" + code)
  }
}