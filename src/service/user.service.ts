import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "src/models/User";
import { HttpService } from "./http.service";

@Injectable({providedIn: 'root'})
export class UserService {
  
  public userSubject = new BehaviorSubject<User[]>([])
  public user: User[]

  constructor(private http: HttpService) {}

  getAllUsers() {
    this.http.getData<User>("/api/auth/users").subscribe((data) => {
      this.userSubject.next(data)
      this.user = data
    })
  }

  updateUser(id: number, role: any) {
    this.http.update<null>("/api/auth/updateRole", {"id": id, "role": role}).subscribe(() => {
      this.getAllUsers()
    })
  }
}