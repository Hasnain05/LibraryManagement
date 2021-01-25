import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { __assign } from 'tslib';
import { UsersService } from '../users.service';

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

  editDisplay='none';
  successUpdateAlert = false;
  errorUpdateAlert = false;

  titleU;
  authorU;
  genreU;
  bookListUser;
  pU:number=1;
  numberOfItemsU;
  display='none';
  depositId;

  titleL;
  authorL;
  genreL;
  bookListLibrary;
  pL:number=1;
  numberOfItemsL;
  displayL='none';
  withdrawId;

  constructor(private route: ActivatedRoute,public router: Router,private usersService : UsersService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if(!this.token){
      this.router.navigate(['/home'])
    }
    const url = "http://localhost:3000/users/me";
    this.usersService.getAuthUser(url,this.token).subscribe((data)=>{
      this.assign(data);
    },(error)=>{
      //something here
    })
  }

  assign(data){
    this.name = data.name;
    this.age = data.age;
    this.email = data.email;
    this.id = data._id;
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

  onOpenModal(id){
    this.depositId = id;
    this.display='block';
  }

  onDepositUser(){
    let url = "http://localhost:3000/me/books/deposit/"+this.depositId;
    this.usersService.updateAuthUser(url,{},this.token).subscribe((data)=>{this.ngOnInit();})
    this.display='none';
  }

  onCloseModal(){
    this.display='none';
  }

  onOpenModalL(id){
    this.withdrawId = id;
    this.displayL='block';
  }

  onWithdrawUser(){
    let url = "http://localhost:3000/me/books/withdraw/"+this.withdrawId;
    this.usersService.updateAuthUser(url,{},this.token).subscribe((data)=>{this.ngOnInit();})
    this.displayL='none';
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
    const url = "http://localhost:3000/users/me";
    this.usersService.updateAuthUser(url,user,this.token).subscribe((data) => { this.successUpdateAlert = true; }, (error: HttpErrorResponse) => {
      this.errorUpdateAlert = true;
    });
    this.ngOnInit();
    this.editDisplay='none';
  }


  onCloseModalL(){
    this.displayL='none';
  }

  SearchU(){
    let url = "http://localhost:3000/books?user="+this.id;
    let countUrl = "http://localhost:3000/books/count?user="+this.id;
    if(this.titleU){
      url = url + "&title=" + this.titleU;
      countUrl = countUrl + "&title=" + this.titleU;
    }
    if(this.authorU){
      url = url + "&author=" + this.authorU;
      countUrl = countUrl + "&author=" + this.authorU;
    }
    if(this.genreU){
      url = url + "&genre=" + this.genreU;
      countUrl = countUrl + "&genre=" + this.genreU;
    }
    this.usersService.getUser(countUrl).
      subscribe((data) => this.assignCountU(data))
    url = url + "&limit=5"
    this.usersService.getUser(url).
      subscribe((data) => this.bookListUser = data)
    this.pU = 1
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

  onPageChangedU(page){
    this.pU = page
    let skip = (page-1)*5;
    let url = "http://localhost:3000/books?user=" + this.id + "&limit=5&skip=" + skip;
    if(this.titleU){
      url = url + "&title=" + this.titleU;
    } 
    if(this.authorU){
      url = url + "&author=" + this.authorU;
    }
    if(this.genreU){
      url = url + "&genre=" + this.genreU;
    }
    this.usersService.getUser(url).
      subscribe((data) => this.bookListUser = data)
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


}
