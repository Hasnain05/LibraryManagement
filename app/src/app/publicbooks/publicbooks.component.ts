import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-publicbooks',
  templateUrl: './publicbooks.component.html',
  styleUrls: ['./publicbooks.component.css']
})
export class PublicbooksComponent implements OnInit {

  titleL;
  authorL;
  genreL;
  search
  bookListLibrary;
  pL:number=1;
  numberOfItemsL;
  displayL='none';
  withdrawId;

  constructor(public router: Router,private usersService : UsersService) { }

  ngOnInit(): void {
    let countUrlL = "http://localhost:3000/books/count";
    let urlL = "http://localhost:3000/books?limit=5";
    this.usersService.getUser(countUrlL).
      subscribe((data) => this.assignCountL(data))
    this.usersService.getUser(urlL).
      subscribe((data) => this.bookListLibrary = data)
      this.pL=1;
  }

  assignCountL(data){
    this.numberOfItemsL = data.count;
  }

  SearchL(){
    let url = "http://localhost:3000/books?assigned=false";
    let countUrl = "http://localhost:3000/books/count?assigned=false";
    if(this.titleL){
      url = url + "&title=" + this.titleL;
      countUrl = countUrl + "&title=" + this.titleL;
    }
    if(this.authorL){
      url = url + "&author=" + this.authorL;
      countUrl = countUrl + "&author=" + this.authorL;
    }
    if(this.genreL){
      url = url + "&genre=" + this.genreL;
      countUrl = countUrl + "&genre=" + this.genreL;
    }
    this.usersService.getUser(countUrl).
      subscribe((data) => this.assignCountL(data))
    url = url + "&limit=5"
    this.usersService.getUser(url).
      subscribe((data) => this.bookListLibrary = data)
    this.pL = 1
  }

  onSearch(){
    let url = "http://localhost:3000/search/books?";
    let countUrl = "http://localhost:3000/search/books/count?";
    if(this.search){
      url = url + "&search=" + this.search;
      countUrl = countUrl + "&search=" + this.search;
    }
    this.usersService.getUser(countUrl).
      subscribe((data) => this.assignCountL(data))
    url = url + "&limit=5"
    this.usersService.getUser(url).
      subscribe((data) => this.bookListLibrary = data)
    this.pL = 1
  }



  onPageChangedL(page){
    this.pL = page
    let skip = (page-1)*5;
    let url = "http://localhost:3000/books?assigned=false&limit=5&skip=" + skip;
    if(this.titleL){
      url = url + "&title=" + this.titleL;
    } 
    if(this.authorL){
      url = url + "&author=" + this.authorL;
    }
    if(this.genreL){
      url = url + "&genre=" + this.genreL;
    }
    this.usersService.getUser(url).
      subscribe((data) => this.bookListLibrary = data)
  }

  onPageChanged(page){
    this.pL = page
    let skip = (page-1)*5;
    let url = "http://localhost:3000/search/books?limit=5&skip=" + skip;
    if(this.search){
      url = url + "&search=" + this.search;
    }
    this.usersService.getUser(url).
      subscribe((data) => this.bookListLibrary = data)
  }

  onWithdraw(){
    this.router.navigate(['/home'])
  }

}
