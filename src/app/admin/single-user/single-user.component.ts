import { Component, Input, Optional, TemplateRef, ViewChild } from '@angular/core';
import { HttpService } from 'src/service/http.service';
import { UserService } from 'src/service/user.service';
import { NbDialogService } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/User';


@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent {  
  @ViewChild("editPromo") ngFormLogin: NgForm
  @Input("user") user: User

  doEdit = false
  errorCode = ""

  constructor(@Optional() private dialogService: NbDialogService, private http: HttpService, private userS: UserService) { }

  editThis() {
    this.doEdit = !this.doEdit
  }

  sureDelete(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {})
  }

  deleteThis() {
    this.http.delete<null>("/api/auth/delete", this.user.id).subscribe(r => {
      this.userS.getAllUsers()
    })
  }


  onSubmit() {
    const role = this.ngFormLogin.value.role

    this.userS.updateUser(this.user.id, role)

    this.clear()
  }

  clear() {
    this.ngFormLogin.reset()
    this.doEdit = false
  }
}
