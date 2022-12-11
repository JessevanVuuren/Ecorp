import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild("formLogin") ngFormLogin?:NgForm
  @ViewChild("formRegister") ngFormRegister?:NgForm


  AwaitResponse = false
  error?: string
  
  isEmailValid = true
  isPassValid = true
  
  isRNameValid = true
  isREmailValid = true
  isRPassValid1 = true
  isRPassValid2 = true

  LoginState = true

  constructor(private auth:AuthService, private router:Router) {
    this.auth.isLoggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) router.navigate(["/home"])
    })
  }

  changeLoginState() {
    this.LoginState = !this.LoginState
  }


  onSubmitLogin() {
    this.isEmailValid = true
    this.isPassValid = true
  
    const email = this.ngFormLogin?.value.email
    const password = this.ngFormLogin?.value.password

    if (!email) this.isEmailValid = false
    if (!password) this.isPassValid = false
    

    if (this.isEmailValid && this.isPassValid) {
      this.AwaitResponse = true

      this.auth.login(email, password).subscribe((data) => {
          this.error = data.message
          this.AwaitResponse = false
        })
      }
  }

  onSubmitRegister() {
    this.isRNameValid = true
    this.isREmailValid = true
    this.isRPassValid1 = true
    this.isRPassValid2 = true
    
    const email = this.ngFormRegister?.value.email
    const name = this.ngFormRegister?.value.name
    const password1 = this.ngFormRegister?.value.password1
    const password2 = this.ngFormRegister?.value.password2

    if (!name) this.isRNameValid = false
    if (!email) this.isREmailValid = false
    if (!password1) this.isRPassValid1 = false
    if (!password2) this.isRPassValid2 = false
    
    if (password1 && password1.length < 6) {
      this.isRPassValid1 = false
      this.isRPassValid2 = false
      this.error = "Password needs at least 6 characters"
    }

    if (password1 !== password2) {
      this.isRPassValid1 = false
      this.isRPassValid2 = false
      this.error = "Passwords does not match"
    }

    if (this.isRNameValid && this.isREmailValid && this.isRPassValid1 && this.isRPassValid2) {
      this.AwaitResponse = true

      this.auth.register(email, name, password1).subscribe((data) => {
          this.error = data.message
          this.AwaitResponse = false
        })
      }

  }

}
