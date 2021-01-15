import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  addBook(book){
    return this.http.post("http://localhost:3000/books", book)
  }

  deleteBook(id){
    return this.http.delete("http://localhost:3000/books/"+id)
  }

  getBook (url){
    return this.http.get(url)
  }

  updateBook(url,book){
    return this.http.put(url, book)
  }
}
