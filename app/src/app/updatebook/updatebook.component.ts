import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent implements OnInit {
  id;
  title;
  author;
  genre;
  successUpdateAlert = false;
  errorUpdateAlert = false;
  page='admin';
  token;

  constructor(private location: Location,private booksService : BooksService,private route:ActivatedRoute,public router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.token = localStorage.getItem('token');
    if(!this.token){
      this.router.navigate(['/home'])
    }
    let url = "http://localhost:3000/books/" + this.id;
    this.booksService.updateBook(url,{},this.token).subscribe((data) => { 
      this.setTextField(data);
     }, (error: HttpErrorResponse) => {
      
    });
  }

  setTextField(data){
    this.title = data.title;
    this.author = data.author;
    this.genre = data.genre;
  }

  onUpdateBook(form: NgForm) {
    const value = form.value;
    const book = {};
    if (value.title != "")
      Object.assign(book, { title: value.title });
    if (value.author != "")
      Object.assign(book, { author: value.author });
    if (value.genre != "")
      Object.assign(book, { genre: value.genre });
    let url = "http://localhost:3000/books/" + this.id;
    this.booksService.updateBook(url,book,this.token).subscribe((data) => { this.successUpdateAlert = true; }, (error: HttpErrorResponse) => {
      this.errorUpdateAlert = true;
    });
  }

  onBack(){
    this.location.back();
  }

}
