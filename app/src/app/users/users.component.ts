import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'

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

  constructor(private http: HttpClient,private dataService:DataService) { }

  ngOnInit(): void {
    this.http.get("http://localhost:3000/users/count").
      subscribe((data) => this.assignCount(data))
    this.http.get("http://localhost:3000/users?limit=5").
      subscribe((data) => this.userList = data)
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
    this.http.get(countUrl).
      subscribe((data) => this.assignCount(data))
    url = url + "&limit=5"
    this.http.get(url).
      subscribe((data) => this.userList = data)
    this.p = 1
  }

  onAddUser(form:NgForm){
    const user = form.value;
    this.http.post("http://localhost:3000/users", user).subscribe((data) => { console.log(data); this.successAddAlert = true; }, (error: HttpErrorResponse) => {
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
    this.http.get(url).
      subscribe((data) => this.userList = data)
  }
  
  onDeleteUser(){
    this.http.delete("http://localhost:3000/users/"+this.deleteId).subscribe((data)=>{console.log(data);})
    this.Search();
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

