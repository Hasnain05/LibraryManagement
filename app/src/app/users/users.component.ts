import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


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
  addDisplay = 'none';
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,private usersService: UsersService,public router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if(!this.token){
      this.router.navigate(['/home'])
    }
    this.usersService.getAllCountUsers(this.token).
      subscribe((data) => this.assignCount(data))
    this.usersService.getAllUsers(this.token).
      subscribe((data) => this.userList = data)
    this.p = 1;
  }

  assignCount(data){
    this.numberOfItems = data.count;
  }

  Search(){
    this.usersService.searchCountAllUsers(this.token,this.name,this.email).
      subscribe((data) => this.assignCount(data))
    this.usersService.searchAllUsers(this.token,this.name,this.email,-1).
      subscribe((data) => this.userList = data)
    this.p = 1
  }

  onAddUser(form:NgForm){
    const user = form.value;
    this.usersService.addUser(user,this.token).subscribe((data) => { this.successAddAlert = true; this.ngOnInit(); }, (error: HttpErrorResponse) => {
      this.errorAddAlert = true;
    });
    this.modalRef.hide();
  } 

  onPageChanged(page){
    this.p = page
    let skip = (page-1)*5;
    this.usersService.searchAllUsers(this.token,this.name,this.email,skip).
      subscribe((data) => this.userList = data)
  }
  
  onDeleteUser(){
    this.usersService.deleteUser(this.deleteId,this.token).subscribe((data)=>{this.ngOnInit();this.successDeleteAlert=true;},(error: HttpErrorResponse) => {
      this.errorDeleteAlert = true;
    })
    this.modalRef.hide();
  }

  onOpenModal(id,template: TemplateRef<any>){
    this.deleteId = id;
    this.modalRef = this.modalService.show(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }
}

