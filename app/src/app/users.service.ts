import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  addUser(user,token){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.post("http://localhost:3000/users", user,{headers})
  }

  deleteUser(id,token){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.delete("http://localhost:3000/users/"+id,{headers})
  }

  getAuthUser(url,token){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.get(url,{headers})
  }

  getUser(url){
    return this.http.get(url)
  }
  
  updateAuthUser(url,user,token){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.put(url,user,{headers})
  }

  updateUser(url,user){
    return this.http.put(url, user)
  }

  logoutUser(token){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.post("http://localhost:3000/logout/user", {}, { headers })
  }
}
