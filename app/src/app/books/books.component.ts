import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  title;
  author;
  genre;
  bookList;
  showAddBook = false;
  successAddAlert = false;
  errorAddAlert = false;
  errorDeleteAlert = false;
  p:number=1;
  countObject;
  numberOfItems;
  display='none';
  deleteId;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://localhost:3000/books/count").
      subscribe((data) => this.assignCount(data))
    this.http.get("http://localhost:3000/books?limit=5").
      subscribe((data) => this.bookList = data)
  }

  assignCount(data){
    this.numberOfItems = data.count;
  }

  onAddBook(form:NgForm){
    const user = form.value;
    this.http.post("http://localhost:3000/books", user).subscribe((data) => { console.log(data); this.successAddAlert = true; }, (error: HttpErrorResponse) => {
      this.errorAddAlert = true;
    });
  } 

  onDeleteBook(){
    this.http.delete("http://localhost:3000/books/"+this.deleteId).subscribe((data)=>{console.log(data);},(error: HttpErrorResponse) => {
      this.errorDeleteAlert = true;
    });
    this.Search();
    this.display='none';
  }

  Search(){
    let url = "http://localhost:3000/books?";
    let countUrl = "http://localhost:3000/books/count?";
    if(this.title){
      url = url + "title=" + this.title;
      countUrl = countUrl + "title=" + this.title;
    }
    if(this.author){
      url = url + "&author=" + this.author;
      countUrl = countUrl + "&author=" + this.author;
    }
    if(this.genre){
      url = url + "&genre=" + this.genre;
      countUrl = countUrl + "&genre=" + this.genre;
    }
    this.http.get(countUrl).
      subscribe((data) => this.assignCount(data))
    url = url + "&limit=5"
    this.http.get(url).
      subscribe((data) => this.bookList = data)
    this.p = 1
  }

  onOpenModal(id){
    this.deleteId = id;
    this.display='block';
  }

  onCloseModal(){
    this.display='none';
  }

  onPageChanged(page){
    this.p = page
    let skip = (page-1)*5;
    let url = "http://localhost:3000/books?limit=5&skip=" + skip;
    if(this.title){
      url = url + "&title=" + this.title;
    } 
    if(this.author){
      url = url + "&author=" + this.author;
    }
    if(this.genre){
      url = url + "&genre=" + this.genre;
    }
    this.http.get(url).
      subscribe((data) => this.bookList = data)
  }

}
