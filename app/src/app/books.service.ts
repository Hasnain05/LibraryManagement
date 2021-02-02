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

  getSingleBook (id){
    let url = "http://localhost:3000/books/" + id;
    return this.http.get(url)
  }  

  getAllBooks (){
    let url = "http://localhost:3000/books?limit=5";
    return this.http.get(url)
  }

  getAllCountBooks (){
    let url = "http://localhost:3000/books/count";
    return this.http.get(url)
  }

  getBookWithLibrary(){
    let url = "http://localhost:3000/books?assigned=false&limit=5";
    return this.http.get(url)
  }

  getCountBookWithLibrary(){
    let url = "http://localhost:3000/books/count?assigned=false";
    return this.http.get(url)
  }

  getBookWithUser(id){
    let url = "http://localhost:3000/books?user=" + id + "&limit=5";
    return this.http.get(url)
  }

  getCountBookWithUser(id){
    let url = "http://localhost:3000/books/count?user=" + id;
    return this.http.get(url)
  }

  searchAllBooks(search,skip){
    let url = "http://localhost:3000/books/search?";
    if(search){
      url = url + "&search=" + search;
    }
    if(skip>=0){
      url = url + "&skip=" + skip;
    }
    url = url + "&limit=5";
    return this.http.get(url)
  }

  searchAllCountBooks(search,skip){
    let url = "http://localhost:3000/books/search/count?";
    if(search){
      url = url + "&search=" + search;
    }
    return this.http.get(url)
  }

  searchBooksWithUser(search,id,skip){
    let url = "http://localhost:3000/books/search?user="+id;
    if(search){
      url = url + "&search=" + search;
    }
    if(skip>=0){
      url = url + "&skip=" + skip;
    }
    url = url + "&limit=5";
    return this.http.get(url)
  }

  searchCountBooksWithUser(search,id,skip){
    let url = "http://localhost:3000/books/search/count?user="+id;
    if(search){
      url = url + "&search=" + search;
    }
    return this.http.get(url)
  }

  searchBooksWithLibrary(search,skip){
    let url = "http://localhost:3000/books/search?assigned=false";
    if(search){
      url = url + "&search=" + search;
    }
    if(skip>=0){
      url = url + "&skip=" + skip;
    }
    url = url + "&limit=5";
    return this.http.get(url)
  }

  searchCountBooksWithLibrary(search,skip){
    let url = "http://localhost:3000/books/search/count?assigned=false";
    if(search){
      url = url + "&search=" + search;
    }
    return this.http.get(url)
  }

  updateBook(id,book,token){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    let url = "http://localhost:3000/books/" + id;
    return this.http.put(url, book,{headers})
  }

  ocr(base64Image){
    let headers = new HttpHeaders();
    headers = headers.set('apikey', '663a42bbe188957');
    const formData = new FormData();
    formData.append('base64Image', base64Image);
    return this.http.post("https://api.ocr.space/parse/image", formData,{headers})
  }
}
