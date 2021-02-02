import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
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

  constructor(public router: Router,private usersService : UsersService,private booksService : BooksService) { }

  ngOnInit(): void {
    this.booksService.getAllCountBooks().
      subscribe((data) => this.assignCountL(data))
    this.booksService.getAllBooks().
      subscribe((data) => this.bookListLibrary = data)
      this.pL=1;
  }

  assignCountL(data){
    this.numberOfItemsL = data.count;
  }

  onSearch(){
    this.booksService.searchAllCountBooks(this.search,-1).
      subscribe((data) => this.assignCountL(data))
    this.booksService.searchAllBooks(this.search,-1).
      subscribe((data) => this.bookListLibrary = data)
    this.pL = 1
  }

  onPageChanged(page){
    this.pL = page
    let skip = (page-1)*5;
    this.booksService.searchAllBooks(this.search,skip).
      subscribe((data) => this.bookListLibrary = data)
  }

  onWithdraw(){
    this.router.navigate(['/home'])
  }

}
