import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from '../books.service';

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
  successDeleteAlert = false;
  p:number=1;
  countObject;
  numberOfItems;
  display='none';
  deleteId;

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    let url = "http://localhost:3000/books?limit=5";
    let countUrl = "http://localhost:3000/books/count";
    this.booksService.getBook(countUrl).
      subscribe((data) => this.assignCount(data))
    this.booksService.getBook(url).
      subscribe((data) => this.bookList = data)
    this.p = 1;
  }

  assignCount(data){
    this.numberOfItems = data.count;
  }

  onAddBook(form:NgForm){
    const book = form.value;
    this.booksService.addBook(book).subscribe((data) => { this.successAddAlert = true; this.ngOnInit(); }, (error: HttpErrorResponse) => {
      this.errorAddAlert = true;
    });
  } 

  onDeleteBook(){
    this.booksService.deleteBook(this.deleteId).subscribe((data)=>{this.ngOnInit(); this.successDeleteAlert = true; },(error: HttpErrorResponse) => {
      this.errorDeleteAlert = true;
    });
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
    this.booksService.getBook(countUrl).
      subscribe((data) => this.assignCount(data))
    url = url + "&limit=5"
    this.booksService.getBook(url).
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
    this.booksService.getBook(url).
      subscribe((data) => this.bookList = data)
  }

}
