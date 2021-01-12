import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent implements OnInit {
  id;
  successUpdateAlert = false;
  errorUpdateAlert = false;

  constructor(private http: HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
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
    this.http.put("http://localhost:3000/books/" + this.id, book).subscribe((data) => { console.log(data); this.successUpdateAlert = true; }, (error: HttpErrorResponse) => {
      this.errorUpdateAlert = true;
    });
  }

}
