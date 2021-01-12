import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-withdrawdeposit',
  templateUrl: './withdrawdeposit.component.html',
  styleUrls: ['./withdrawdeposit.component.css']
})
export class WithdrawdepositComponent implements OnInit {
  id;
  title;
  author;
  genre;
  bookList;
  p:number=1;
  countObject;
  numberOfItems;
  display='none';
  deleteId;

  constructor(private http: HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.http.get("http://localhost:3000/books/count?assigned="+this.id).
      subscribe((data) => this.assignCount(data))
    this.http.get("http://localhost:3000/books?assigned="+this.id+"&limit=5").
      subscribe((data) => this.bookList = data)
  }

  assignCount(data){
    this.numberOfItems = data.count;
  }

  onOpenModal(id){
    this.deleteId = id;
    this.display='block';
  }

  onCloseModal(){
    this.display='none';
  }

  Search(){
    let url = "http://localhost:3000/books?assigned="+this.id;
    let countUrl = "http://localhost:3000/books/count?assigned="+this.id;
    if(this.title){
      url = url + "&title=" + this.title;
      countUrl = countUrl + "&title=" + this.title;
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

  onPageChanged(page){
    this.p = page
    let skip = (page-1)*5;
    let url = "http://localhost:3000/books?assigned=" + this.id + "&limit=5&skip=" + skip;
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
