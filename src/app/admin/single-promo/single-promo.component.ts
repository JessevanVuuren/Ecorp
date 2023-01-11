import { Component, Input, EventEmitter, Output, Optional, TemplateRef, ViewChild } from '@angular/core';
import { ServerService } from 'src/service/server.service';
import { HttpService } from 'src/service/http.service';
import { PromoCode } from 'src/models/PromoCode';
import { NbDialogService } from '@nebular/theme';
import { PromoCodeService } from 'src/service/promoCode.service';
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

      this.isNameValid = true
      this.isAmountValid = true
      
      if (!name) this.isNameValid = false
      if (!amount) this.isAmountValid = false
      
      const amountVal = !this.isNumeric(amount)
      this.isAmountValid = !amountVal
      
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
    this.doEdit = false
  }
}
