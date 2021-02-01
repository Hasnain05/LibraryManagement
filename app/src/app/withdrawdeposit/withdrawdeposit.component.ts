import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';
import { UsersService } from '../users.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-withdrawdeposit',
  templateUrl: './withdrawdeposit.component.html',
  styleUrls: ['./withdrawdeposit.component.css']
})
export class WithdrawdepositComponent implements OnInit {
  id;
  page='admin';

  titleU;
  authorU;
  genreU;
  searchU;
  bookListUser;
  pU:number=1;
  numberOfItemsU;
  display='none';
  depositId;

  titleL;
  authorL;
  genreL;
  searchL;
  bookListLibrary;
  pL:number=1;
  numberOfItemsL;
  displayL='none';
  withdrawId;
  token;

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,private route:ActivatedRoute, private usersService:UsersService,private booksService:BooksService,public router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(!this.token){
      this.router.navigate(['/home'])
    }
    this.id = this.route.snapshot.params['id'];
    let countUrlL = "http://localhost:3000/books/count?assigned=false";
    let urlL = "http://localhost:3000/books?assigned=false&limit=5";
    let countUrlU = "http://localhost:3000/books/count?user=" + this.id;
    let urlU = "http://localhost:3000/books?user=" + this.id + "&limit=5";
    this.usersService.getUser(countUrlL).
      subscribe((data) => this.assignCountL(data))
    this.usersService.getUser(urlL).
      subscribe((data) => this.bookListLibrary = data)
    this.usersService.getUser(countUrlU).
      subscribe((data) => this.assignCountU(data))
    this.usersService.getUser(urlU).
      subscribe((data) => this.bookListUser = data)
    this.pU = 1;
    this.pL = 1;
  }

  assignCountU(data){
    this.numberOfItemsU = data.count;
  }

  assignCountL(data){
    this.numberOfItemsL = data.count;
  }

  onOpenModal(id,template: TemplateRef<any>){
    this.depositId = id;
    this.modalRef = this.modalService.show(template);
  }

  onDepositUser(){
    let url = "http://localhost:3000/"+this.id+"/books/deposit/"+this.depositId;
    this.usersService.updateAuthUser(url,{},this.token).subscribe((data)=>{this.ngOnInit();})
    this.modalRef.hide();
  }

  onOpenModalL(id,template: TemplateRef<any>){
    this.withdrawId = id;
    this.modalRef = this.modalService.show(template);
  }

  onWithdrawUser(){
    let url = "http://localhost:3000/"+this.id+"/books/withdraw/"+this.withdrawId;
    this.usersService.updateAuthUser(url,{},this.token).subscribe((data)=>{this.ngOnInit();})
    this.modalRef.hide();
  }

  onBookDetails(id){
    this.router.navigate(['/books',id,'details']);
  }

  onSearchU(){
    let url = "http://localhost:3000/search/books?user="+this.id;
    let countUrl = "http://localhost:3000/search/books/count?user="+this.id;
    if(this.searchU){
      url = url + "&search=" + this.searchU;
      countUrl = countUrl + "&search=" + this.searchU;
    }
    this.booksService.getBook(countUrl).
      subscribe((data) => this.assignCountU(data))
    url = url + "&limit=5"
    this.booksService.getBook(url).
      subscribe((data) => this.bookListUser = data)
    this.pU = 1
  }

  onSearchL(){
    let url = "http://localhost:3000/search/books?assigned=false";
    let countUrl = "http://localhost:3000/search/books/count?assigned=false";
    if(this.searchL){
      url = url + "&search=" + this.searchL;
      countUrl = countUrl + "&search=" + this.searchL;
    }
    this.booksService.getBook(countUrl).
      subscribe((data) => this.assignCountL(data))
    url = url + "&limit=5"
    this.booksService.getBook(url).
      subscribe((data) => this.bookListLibrary = data)
    this.pL = 1
  }

  onPageChangedU(page){
    this.pU = page
    let skip = (page-1)*5;
    let url = "http://localhost:3000/search/books?user=" + this.id + "&limit=5&skip=" + skip;
    if(this.searchU){
      url = url + "&search=" + this.searchU;
    }
    this.booksService.getBook(url).
      subscribe((data) => this.bookListUser = data)
  }

  onPageChangedL(page){
    this.pL = page
    let skip = (page-1)*5;
    let url = "http://localhost:3000/search/books?assigned=false&limit=5&skip=" + skip;
    if(this.searchL){
      url = url + "&search=" + this.searchL;
    }
    this.booksService.getBook(url).
      subscribe((data) => this.bookListLibrary = data)
  }
}
