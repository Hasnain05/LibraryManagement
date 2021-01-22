import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

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
  token;


  constructor(private route:ActivatedRoute, private usersService:UsersService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
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

  onOpenModal(id){
    this.depositId = id;
    this.display='block';
  }

  onDepositUser(){
    let url = "http://localhost:3000/"+this.id+"/books/deposit/"+this.depositId;
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
    let url = "http://localhost:3000/"+this.id+"/books/withdraw/"+this.withdrawId;
    this.usersService.updateAuthUser(url,{},this.token).subscribe((data)=>{this.ngOnInit();})
    this.displayL='none';
    
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
