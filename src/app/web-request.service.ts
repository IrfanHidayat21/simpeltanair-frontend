import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;
  constructor(
    private http: HttpClient
  ) {
    // this.ROOT_URL = "http://localhost:3000";
    this.ROOT_URL = "https://simpeltanair-api.vercel.app";
   }

   get(url:string) {
    return this.http.get(`${this.ROOT_URL}/${url}`);
   }

   post(url: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${url}`, payload);
   }

   patch(url: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${url}`, payload);
   }

   delete(url:string) {
    return this.http.delete(`${this.ROOT_URL}/${url}`);
   }

   login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`,{
      email,
      password
    }, { 
      observe: 'response'
     })
  }

   signup(email: string, nahkoda:string, jumlahKru: number, kru:string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users`,{
      email,
      nahkoda,
      jumlahKru,
      kru,
      password
    }, { 
      observe: 'response'
     })
  }
}
