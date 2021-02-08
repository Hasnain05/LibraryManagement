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
    this.booksService.getCountBookWithLibrary().
      subscribe((data) => this.assignCountL(data))
    this.booksService.getBookWithLibrary().
      subscribe((data) => this.bookListLibrary = data)
    this.booksService.getCountBookWithUser(this.id).
      subscribe((data) => this.assignCountU(data))
    this.booksService.getBookWithUser(this.id).
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
    this.usersService.depositBookAdmin(this.id,this.depositId,this.token).subscribe((data)=>{this.ngOnInit();})
    this.modalRef.hide();
  }

  onOpenModalL(id,template: TemplateRef<any>){
    this.withdrawId = id;
    this.modalRef = this.modalService.show(template);
  }

  onWithdrawUser(){
    this.usersService.withdrawBookAdmin(this.id,this.withdrawId,this.token).subscribe((data)=>{this.ngOnInit();})
    this.modalRef.hide();
  }

  onBookDetails(id){
    this.router.navigate(['/books',id,'details']);
  }

  onSearchU(){
    this.booksService.searchCountBooksWithUser(this.searchU,this.id,-1).
      subscribe((data) => this.assignCountU(data))
    this.booksService.searchBooksWithUser(this.searchU,this.id,-1).
      subscribe((data) => this.bookListUser = data)
    this.pU = 1
  }

  onSearchL(){
    this.booksService.searchCountBooksWithLibrary(this.searchL,-1).
      subscribe((data) => this.assignCountL(data))
    this.booksService.searchBooksWithLibrary(this.searchL,-1).
      subscribe((data) => this.bookListLibrary = data)
    this.pL = 1
  }

  onPageChangedU(page){
    this.pU = page
    let skip = (page-1)*5;
    this.booksService.searchBooksWithUser(this.searchU,this.id,skip).
      subscribe((data) => this.bookListUser = data)
  }

  onPageChangedL(page){
    this.pL = page
    let skip = (page-1)*5;
    this.booksService.searchBooksWithLibrary(this.searchL,skip).
      subscribe((data) => this.bookListLibrary = data)
  }
}
