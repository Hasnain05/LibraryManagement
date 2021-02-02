import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  loginGoogle(body){
    return this.http.post("http://localhost:3000/login/google",body)
  }

  loginCredentials(body){
    return this.http.post("http://localhost:3000/login/user",body)
  }

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

  getAllUsers(token){
    let url = "http://localhost:3000/users?limit=5";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.get(url,{headers})
  }

  getAllCountUsers(token){
    let url = "http://localhost:3000/users/count";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.get(url,{headers})
  }

  searchAllUsers(token,name,email,skip){
    let url = "http://localhost:3000/users?";
    if(name){
      url = url + "name=" + name;
    } 
    if(email){
      url = url + "&email=" + email;
    }
    if(skip>=0){
      url = url + "&skip=" + skip;
    }
    url = url + "&limit=5";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.get(url,{headers})
  }

  searchCountAllUsers(token,name,email){
    let url = "http://localhost:3000/users/count?";
    if(name){
      url = url + "name=" + name;
    } 
    if(email){
      url = url + "&email=" + email;
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.get(url,{headers})
  }

  getSelfDetails(token){
    const url = "http://localhost:3000/users/me";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.get(url,{headers})
  }

  getUser(url){
    return this.http.get(url)
  }
  
  updateAuthUser(id,user,token){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    let url = "http://localhost:3000/users/" + id;
    return this.http.put(url,user,{headers})
  }

  updateSelfDetails(user,token){
    const url = "http://localhost:3000/users/me";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.put(url,user,{headers})
  }

  depositBook(id,token){
    let url = "http://localhost:3000/me/books/deposit/"+ id;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.put(url,{},{headers})
  }

  withdrawBook(id,token){
    let url = "http://localhost:3000/me/books/withdraw/"+ id;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.put(url,{},{headers})
  }

  depositBookAdmin(userId,bookId,token){
    let url = "http://localhost:3000/"+userId+"/books/deposit/"+bookId;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.put(url,{},{headers})
  }

  withdrawBookAdmin(userId,bookId,token){
    let url = "http://localhost:3000/"+userId+"/books/withdraw/"+bookId;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.put(url,{},{headers})
  }

  logoutUser(token){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.post("http://localhost:3000/logout/user", {}, { headers })
  }
}
