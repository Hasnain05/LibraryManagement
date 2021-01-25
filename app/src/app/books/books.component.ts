import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  addDisplay='none';
  display='none';
  deleteId;
  page='admin';
  token;

  products = [];
  uploadDisplay='none';
  addMultipleBookStatus=true;

  constructor(private booksService: BooksService,public router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(!this.token){
      this.router.navigate(['/home'])
    }
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
    this.booksService.addBook(book,this.token).subscribe((data) => { this.successAddAlert = true; this.ngOnInit(); }, (error: HttpErrorResponse) => {
      this.errorAddAlert = true;
    });
  } 

  onDeleteBook(){
    this.booksService.deleteBook(this.deleteId,this.token).subscribe((data)=>{this.ngOnInit(); this.successDeleteAlert = true; },(error: HttpErrorResponse) => {
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

  onOpenUploadModal(){
    this.uploadDisplay='block';
  }

  onOpenAddModal(){
    this.addDisplay='block';
  }

  onAddMultipleBooks(){
    for(let i=0;i<this.products.length;i++){
      this.booksService.addBook(this.products[i],this.token).subscribe((data) => {  }, (error: HttpErrorResponse) => {});
    }
    this.uploadDisplay='none';
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

  uploadExcel(e) {
    try {
      this.addMultipleBookStatus = true;
      const fileName = e.target.files[0].name;
      import('xlsx').then(xlsx => {
        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        // const file = ev.target.files[0];
        reader.onload = (event) => {
          const data = reader.result;
          workBook = xlsx.read(data, { type: 'binary' });
          jsonData = workBook.SheetNames.reduce((initial, name) => {
            const sheet = workBook.Sheets[name];
            initial[name] = xlsx.utils.sheet_to_json(sheet);
            return initial;
          }, {});
          this.products = jsonData[Object.keys(jsonData)[0]];
          this.addMultipleBookStatus=false;
        };
        reader.readAsBinaryString(e.target.files[0]);
      });
    } catch (e) {
      console.log('error', e);
    }
  }

}
