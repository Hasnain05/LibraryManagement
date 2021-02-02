import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  title;
  author;
  genre;
  search;
  bookList;
  showAddBook = false;
  successAddAlert = false;
  errorAddAlert = false;
  errorDeleteAlert = false;
  successDeleteAlert = false;
  p:number=1;
  countObject;
  numberOfItems;
  addDisplay='none';
  display='none';
  deleteId;
  page='admin';
  token;

  modalRef: BsModalRef;

  products = [];
  uploadDisplay='none';
  addMultipleBookStatus=true;
  countSuccessBooks = 0;
  successAddMultipleAlert = false;
  base64Image;
  imagePath;


  constructor(private booksService: BooksService,public router: Router,private _sanitizer: DomSanitizer,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(!this.token){
      this.router.navigate(['/home'])
    }
    this.booksService.getAllCountBooks().
      subscribe((data) => this.assignCount(data))
    this.booksService.getAllBooks().
      subscribe((data) => this.bookList = data)
    this.p = 1;
  }

  assignCount(data){
    this.numberOfItems = data.count;
  }

  onAddBook(form:NgForm){
    const book = form.value;
    book.coverImage = this.base64Image;
    this.booksService.addBook(book,this.token).subscribe((data) => { this.successAddAlert = true; this.ngOnInit(); }, (error: HttpErrorResponse) => {
      this.errorAddAlert = true;
    });
    this.modalRef.hide();
  } 

  onDeleteBook(){
    this.booksService.deleteBook(this.deleteId,this.token).subscribe((data)=>{this.ngOnInit(); this.successDeleteAlert = true; },(error: HttpErrorResponse) => {
      this.errorDeleteAlert = true;
    });
    this.modalRef.hide();
  }

  onSearch(){
    this.booksService.searchAllCountBooks(this.search,-1).
      subscribe((data) => this.assignCount(data))
    this.booksService.searchAllBooks(this.search,-1).
      subscribe((data) => this.bookList = data)
    this.p = 1
  }

  onOpenModal(id,template: TemplateRef<any>){
    this.deleteId = id;
    this.modalRef = this.modalService.show(template);
  }

  onOpenUploadModal(){
    this.uploadDisplay='block';
  }

  onOpenAddModal(){
    this.addDisplay='block';
  }

  onAddMultipleBooks(){
    this.countSuccessBooks = 0;
    for(let i=0;i<this.products.length;i++){
      this.booksService.addBook(this.products[i],this.token).subscribe((data) => {  this.ngOnInit(); this.countSuccessBooks++;}, (error: HttpErrorResponse) => {});
    }
    this.modalRef.hide();
    this.successAddMultipleAlert = true;
  }

  onPageChanged(page){
    this.p = page
    let skip = (page-1)*5;
    this.booksService.searchAllBooks(this.search,skip).
      subscribe((data) => this.bookList = data)
  }

  uploadExcel(e) {
    try {
      this.addMultipleBookStatus = true;
      const fileName = e.target.files[0].name;
      import('xlsx').then(xlsx => {
        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        // const file = ev.target.files[0];
        reader.onload = (event) => {
          const data = reader.result;
          workBook = xlsx.read(data, { type: 'binary' });
          jsonData = workBook.SheetNames.reduce((initial, name) => {
            const sheet = workBook.Sheets[name];
            initial[name] = xlsx.utils.sheet_to_json(sheet);
            return initial;
          }, {});
          this.products = jsonData[Object.keys(jsonData)[0]];
          this.addMultipleBookStatus=false;
        };
        reader.readAsBinaryString(e.target.files[0]);
      });
    } catch (e) {
      console.log('error', e);
    }
  }

  onEditBook(id){
    this.router.navigate(['/books',id,'edit']);
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

}
