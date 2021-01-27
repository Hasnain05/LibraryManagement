import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-booksdetails',
  templateUrl: './booksdetails.component.html',
  styleUrls: ['./booksdetails.component.css']
})
export class BooksdetailsComponent implements OnInit {
  id;
  token;
  title;
  author;
  genre;
  page="user";
  
  constructor(private location: Location,private booksService : BooksService,private route:ActivatedRoute,public router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.token = localStorage.getItem('token');
    if(!this.token){
      this.router.navigate(['/home'])
    }
    let url = "http://localhost:3000/books/" + this.id;
    this.booksService.getBook(url).subscribe((data) => { 
      this.setTextField(data);
     }, (error: HttpErrorResponse) => {
      
    });
  }

  setTextField(data){
    this.title = data.title;
    this.author = data.author;
    this.genre = data.genre;
  }

  onBack(){
    this.location.back();
  }

}
