import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private booksService : BooksService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    let url = "http://localhost:3000/books/" + this.id;
    this.booksService.updateBook(url,{}).subscribe((data) => { 
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
    this.booksService.updateBook(url,book).subscribe((data) => { this.successUpdateAlert = true; }, (error: HttpErrorResponse) => {
      this.errorUpdateAlert = true;
    });
  }

}
