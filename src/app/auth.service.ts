import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { AuthResponse } from "../models/AuthResponse.model";
import { JwtToken } from "../models/jwtToken.model";

const BASE_URL = "http://localhost:8080/api"

@Injectable()
export class AuthService implements CanActivate, CanActivateChild {
  private _isLoggedIn = new BehaviorSubject<boolean>(false)
  isLoggedIn = this._isLoggedIn.asObservable()

  private _changePassword = new BehaviorSubject<boolean>(false)
  changePassword = this._changePassword.asObservable()

  token = ""


  constructor(private router: Router, private http: HttpClient) {
    const token = this.checkForKey()
    this._isLoggedIn.next(token)
  }


  checkForKey(): boolean {
    return !!localStorage.getItem("auth_key")
  }


  login(email: string, pass: string) {

    return this.http.post<AuthResponse>(BASE_URL + "/auth/login", {
      email: email,
      password: pass
    }).pipe(tap(data => {
      if (!data.success) return
      const token = this.decodeJWTToken(data.jwtToken)
      if (token.defaultPass) {
        this._changePassword.next(true)
        this.token = data.jwtToken
      } else {
        localStorage.setItem("auth_key", data.jwtToken)
        this._isLoggedIn.next(true)
      }
    }))
  }

  decodeJWTToken(token: string): JwtToken {
    const object = JSON.parse(atob(token.split('.')[1]))
    return new JwtToken(object["defaultPass"], object["sub"], object["role"], object["name"], object["iss"], object["id"], object["iat"], object["email"]);
  }


  updatePassword(email: string, oldPassword: string, newPassword: string) {
    return this.http.post<AuthResponse>(BASE_URL + "/auth/changepassword", {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword
    }, { headers: new HttpHeaders().set("Authorization", "Bearer " + this.token) }).pipe(tap(data => {
      if (!data.success) return
      const token = this.decodeJWTToken(data.jwtToken)
      if (token.defaultPass) {
        this._changePassword.next(true)
      } else {
        localStorage.setItem("auth_key", data.jwtToken)
        this._isLoggedIn.next(true)
      }
    }))
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this._isLoggedIn.getValue()) return true
    else {
      this.router.navigate(["/"])
      return false
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state)
  }
}
