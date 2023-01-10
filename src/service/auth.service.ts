import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { AuthResponse } from "../models/AuthResponse.model";
import { JwtToken } from "../models/jwtToken.model";
import { environment } from 'src/environments/environment';


const BASE_URL = environment.apiURL + "/api"

@Injectable({providedIn: 'root'})
export class AuthService implements CanActivate, CanActivateChild {
  private _isLoggedIn = new BehaviorSubject<boolean>(false)
  isLoggedIn = this._isLoggedIn.asObservable()

  private _changePassword = new BehaviorSubject<boolean>(false)
  changePassword = this._changePassword.asObservable()

  token = ""
  userIsAdmin = new BehaviorSubject<boolean>(false)
  isLocalAdmin = false

  constructor(private router: Router, private http: HttpClient) {
    const token = this.checkForKey()
    this._isLoggedIn.next(token)
    
    if (token) this.checkForAdmin(this.getToken())
  }


  checkForKey(): boolean {
    return !!localStorage.getItem("crop_key")
  }

  checkForAdmin(tokenS:string) {
    const token = this.decodeJWTToken(tokenS)
    if (token.role === "ADMIN") {
      this.userIsAdmin.next(true)
      this.isLocalAdmin = true
    }
    else {
      this.userIsAdmin.next(false)
      this.isLocalAdmin = false
    }
  }

  logout() {
    localStorage.removeItem("crop_key")
    this.isLocalAdmin = false
    this._isLoggedIn.next(false)
    this.userIsAdmin.next(false)
    this.token = ""
    setTimeout(() => this.router.navigate(["/login"]), 20)
  
  }

  getToken(): string {
    if (this.checkForKey()) {
      return localStorage.getItem("crop_key")
    }
    return ""
  }


  login(email: string, pass: string) {

    return this.http.post<AuthResponse>(BASE_URL + "/auth/login", {
      email: email,
      password: pass
    }).pipe(tap(data => {
      if (!data.success) return
      const token = this.decodeJWTToken(data.jwtToken)
      this.checkForAdmin(data.jwtToken)
      if (token.defaultPass) {
        this._changePassword.next(true)
        this.token = data.jwtToken
      } else {
        localStorage.setItem("crop_key", data.jwtToken)
        this._isLoggedIn.next(true)
      }
    }))
  }

  register(email: string, name: string, pass: string) {

    return this.http.post<AuthResponse>(BASE_URL + "/auth/register", {
      email: email,
      password: pass,
      name: name
    }).pipe(tap(data => {
      if (!data.success) return
      const token = this.decodeJWTToken(data.jwtToken)
      this.checkForAdmin(data.jwtToken)
      if (token.defaultPass) {
        this._changePassword.next(true)
        this.token = data.jwtToken
      } else {
        localStorage.setItem("crop_key", data.jwtToken)
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
        localStorage.setItem("crop_key", data.jwtToken)
        this._isLoggedIn.next(true)
      }
    }))
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this._isLoggedIn.getValue()) {
      if (route.url[0] && route.url[0].path === "admin") {
        if (!this.isLocalAdmin) {
          this.router.navigate(["/login"])
          return false
        }
      }
      return true
    }
    else {
      this.router.navigate(["/login"])
      return false
    }

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state)
  }
}
