import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  addBook(book,token){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.post("http://localhost:3000/books", book,{headers})
  }

  deleteBook(id,token){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.delete("http://localhost:3000/books/"+id,{headers})
  }

  getBook (url){
    return this.http.get(url)
  }

  updateBook(url,book,token){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    return this.http.put(url, book,{headers})
  }
}
