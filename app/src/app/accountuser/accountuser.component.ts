import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { __assign } from 'tslib';
import { BooksService } from '../books.service';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from "ngx-spinner";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-accountuser',
  templateUrl: './accountuser.component.html',
  styleUrls: ['./accountuser.component.css']
})
export class AccountuserComponent implements OnInit {
  token;
  page = "user";
  name;
  id;
  age;
  email;
  modalRef: BsModalRef;

  editDisplay='none';
  successUpdateAlert = false;
  errorUpdateAlert = false;
  addDisplay='none';
  base64Image;
  summary;
  successAddAlert = false;
  errorAddAlert = false;

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
  searchL
  bookListLibrary;
  pL:number=1;
  numberOfItemsL;
  displayL='none';
  withdrawId;

  constructor(private modalService: BsModalService,private spinner: NgxSpinnerService,private booksService: BooksService,private route: ActivatedRoute,public router: Router,private usersService : UsersService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if(!this.token){
      this.router.navigate(['/home'])
    }
    this.usersService.getSelfDetails(this.token).subscribe((data)=>{
      this.assign(data);
    },(error)=>{
      this.router.navigate(['/home'])
    })
  }

  assign(data){
    this.name = data.name;
    this.age = data.age;
    this.email = data.email;
    this.id = data._id;
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
    this.usersService.depositBook(this.depositId,this.token).subscribe((data)=>{this.ngOnInit();})
    this.modalRef.hide();
  }

  onOpenModalL(id,template: TemplateRef<any>){
    this.withdrawId = id;
    this.modalRef = this.modalService.show(template);
  }

  onWithdrawUser(){
    this.usersService.withdrawBook(this.withdrawId,this.token).subscribe((data)=>{this.ngOnInit();})
    this.modalRef.hide();
  }

  onEditUser(form:NgForm){
    const value = form.value;
    const user = {};
    if (value.name != "")
      Object.assign(user, { name: value.name });
    if (value.age != "" && value.age != null)
      Object.assign(user, { age: value.age });
    if (value.email != "")
      Object.assign(user, { email: value.email });
    this.usersService.updateSelfDetails(user,this.token).subscribe((data) => { this.successUpdateAlert = true; }, (error: HttpErrorResponse) => {
      this.errorUpdateAlert = true;
    });
    this.ngOnInit();
    this.modalRef.hide();
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

  onBookDetails(id){
    this.router.navigate(['/books',id,'details']);
  }

  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.base64Image = reader.result;
    };
  }

  getBase64Summary(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.imageToText(reader.result);
    };
  }

  imageToText(image){
    this.spinner.show();
    this.booksService.ocr(image).subscribe((data) => { this.assignSummary(data) }, (error: HttpErrorResponse) => {
      
    });
  }

  assignSummary(data){
    this.spinner.hide();
    this.summary=data.ParsedResults[0].ParsedText;
  }

  onDonateBook(form:NgForm){
    const book = form.value;
    book.coverImage = this.base64Image;
    this.booksService.addBook(book,this.token).subscribe((data) => { this.successAddAlert = true; this.ngOnInit(); }, (error: HttpErrorResponse) => {
      this.errorAddAlert = true;
    });
    this.modalRef.hide();
  } 

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

}
