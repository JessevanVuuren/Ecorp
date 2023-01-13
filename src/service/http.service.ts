import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class HttpService {
  public url = environment.apiURL
  AuthKey?: string
  constructor(private http: HttpClient, private auth: AuthService) {
    this.AuthKey = this.auth.token
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set("Authorization", "Bearer " + this.AuthKey);
  }

  public getData<T>(path: String): Observable<Array<T>> {
    return this.http
      .get<T[]>(this.url + path, { 'headers': this.getHeaders() })
  }

  public getSingleData<T>(path: String): Observable<T> {
    return this.http
      .get<T>(this.url + path, { 'headers': this.getHeaders() })
  }

  public sendData<T>(path: string, data: any): Observable<T> {
    return this.http.post<T>(this.url + path, data, { 'headers': this.getHeaders() })
  }

  public update<T>(path: string, data: any): Observable<T> {
    return this.http.put<T>(this.url + path, data, { "headers": this.getHeaders() })
  }

  public delete<T>(path: string, id: number): Observable<T> {
    return this.http.delete<T>(this.url + path + "/" + id, { "headers": this.getHeaders() })
  }
}