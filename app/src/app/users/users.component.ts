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
  key:string='name';
  reverse = false;
  p:number=1;
  constructor(private http: HttpClient,private dataService:DataService) { }

  ngOnInit(): void {
    this.http.get("http://localhost:3000/users").
      subscribe((data) => this.userList = data)
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;  
  }

  Search(){
    let url = "http://localhost:3000/users?";
    if(this.name)
      url = url + "name=" + this.name + "&";
    if(this.email)
      url = url + "email=" + this.email;
    this.http.get(url).
      subscribe((data) => this.userList = data)
  }

  onAddUser(form:NgForm){
    const user = form.value;
    this.http.post("http://localhost:3000/users", user).subscribe((data) => {console.log(data);this.successAddAlert=true;}, (error: HttpErrorResponse) => {
      this.errorAddAlert=true;
    });
  } 

  onUpdateDetail(id){
    this.dataService.updateId=id;
  }
}

