import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class HttpService{
  public url = "http://localhost:8080"
  constructor(private http: HttpClient) {}

  headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set("Authorization", "Bearer " + localStorage.getItem("auth_key"));

  public getData<T>(path: String): Observable<Array<T>>{
    return this.http
      .get<T[]>(this.url+path, {'headers':this.headers})
  }

  public getSingleData<T>(path: String): Observable<T>{
    return this.http
      .get<T>(this.url+path, {'headers':this.headers})
  }

  public sendData<T>(path:string, data:any): Observable<T>{
    return this.http.post<T>(this.url + path, data, {
      'headers':this.headers
    })
  }
}