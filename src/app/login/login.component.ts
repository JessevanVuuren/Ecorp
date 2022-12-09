import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild("form") ngForm?:NgForm
  isValidLogin = true
  AwaitLogin = false
  error?: string

  onSubmit() {
    this.AwaitLogin = true

    setTimeout(() => {
      this.AwaitLogin = false
      this.isValidLogin = false

      this.error = "Invalid Login"

    }, 1000)
  }
}
