import { Component, Input, Optional, TemplateRef, ViewChild } from '@angular/core';
import { PromoCodeService } from 'src/service/promoCode.service';
import { HttpService } from 'src/service/http.service';
import { PromoCode } from 'src/models/PromoCode';
import { NbDialogService } from '@nebular/theme';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-single-promo',
  templateUrl: './single-promo.component.html',
  styleUrls: ['./single-promo.component.scss']
})
export class SinglePromoComponent {
  @ViewChild("editPromo") ngFormLogin: NgForm
  @Input("promoCode") promo: PromoCode
  @Input("make") make: boolean = false

  isNameValid = true
  isAmountValid = true

  errorCode = ""

  doEdit = false

  constructor(@Optional() private dialogService: NbDialogService, private http: HttpService, private promoS: PromoCodeService) { }

  editThis() {
    this.doEdit = !this.doEdit
  }

  sureDelete(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {})
  }

  deleteThis() {
    this.http.delete<null>("/api/promocode/delete", this.promo.id).subscribe(r => {
      this.promoS.getAllPromoCodes()
    })
  }

  isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  onSubmit() {
      const name = this.ngFormLogin.value.name
      const amount = this.ngFormLogin.value.amount

      this.errorCode = ""
      this.isNameValid = true
      this.isAmountValid = true
      
      if (!name) this.isNameValid = false
      if (!amount) this.isAmountValid = false
      
      const amountVal = !this.isNumeric(amount)
      this.isAmountValid = !amountVal

      if (this.promoS.getAllNames().includes(name)) {
        this.errorCode = "Name already in use"
        this.isNameValid = false
      }

      if (this.isAmountValid && (amount > 100 || amount < 1)) {
        this.isAmountValid = false
        this.errorCode = "Promo range 1 - 100"
      }
      
      if (!this.isNameValid || !this.isAmountValid) return
      else {
        if (this.make) { 
          this.promoS.createNewPromo(name, amount)
        } else {
          this.promoS.updatePromo(this.promo.id, name, amount)
        }
      }
      this.clear()
  }

  clear() {
    this.ngFormLogin.reset()
    this.errorCode = ""
    this.doEdit = false
  }
}
