import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList;
  name;
  email;
  showAddUser = false;
  successAddAlert = false;
  errorAddAlert = false;
  p:number=1;
  countObject;
  numberOfItems;
  display='none';
  deleteId;
  errorDeleteAlert = false;
  successDeleteAlert = false;
  page="admin"
  token;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    let url = "http://localhost:3000/users?limit=5";
    let countUrl = "http://localhost:3000/users/count";
    this.usersService.getAuthUser(countUrl,this.token).
      subscribe((data) => this.assignCount(data))
    this.usersService.getAuthUser(url,this.token).
      subscribe((data) => this.userList = data)
    this.p = 1;
  }

  assignCount(data){
    this.numberOfItems = data.count;
  }

  Search(){
    let url = "http://localhost:3000/users?";
    let countUrl = "http://localhost:3000/users/count?";
    if(this.name){
      url = url + "name=" + this.name;
      countUrl = countUrl + "name=" + this.name;
    } 
    if(this.email){
      url = url + "&email=" + this.email;
      countUrl = countUrl + "&email=" + this.email;
    }
    this.usersService.getAuthUser(countUrl,this.token).
      subscribe((data) => this.assignCount(data))
    url = url + "&limit=5"
    this.usersService.getAuthUser(url,this.token).
      subscribe((data) => this.userList = data)
    this.p = 1
  }

  onAddUser(form:NgForm){
    const user = form.value;
    this.usersService.addUser(user,this.token).subscribe((data) => { this.successAddAlert = true; this.ngOnInit(); }, (error: HttpErrorResponse) => {
      this.errorAddAlert = true;
    });
  } 

  onPageChanged(page){
    this.p = page
    let skip = (page-1)*5;
    let url = "http://localhost:3000/users?limit=5&skip=" + skip;
    if(this.name){
      url = url + "&name=" + this.name;
    } 
    if(this.email){
      url = url + "&email=" + this.email;
    }
    this.usersService.getAuthUser(url,this.token).
      subscribe((data) => this.userList = data)
  }
  
  onDeleteUser(){
    this.usersService.deleteUser(this.deleteId,this.token).subscribe((data)=>{this.ngOnInit();this.successDeleteAlert=true;},(error: HttpErrorResponse) => {
      this.errorDeleteAlert = true;
    })
    this.display='none';
  }

  onOpenModal(id){
    this.deleteId = id;
    this.display='block';
  }

  onCloseModal(){
    this.display='none';
  }
}

