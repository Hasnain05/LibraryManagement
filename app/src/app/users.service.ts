import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  addUser(user){
    return this.http.post("http://localhost:3000/users", user)
  }

  deleteUser(id){
    return this.http.delete("http://localhost:3000/users/"+id)
  }

  getUser(url){
    return this.http.get(url)
  }

  updateUser(url,user){
    return this.http.put(url, user)
  }
}
