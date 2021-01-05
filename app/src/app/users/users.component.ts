import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  name = "";
  age = "";
  email = "";
  id = "";
  showUser = false;
  status = "No user created yet";
  userList;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onAddUser(){
    this.http.post("http://localhost:3000/users",{
      _id : 51,
      name : "Ali Hasnain",
      age : 18,
      email : "ali@example.com"
  }).subscribe((data) => console.log(data))
  } 

  onUserList(){
    this.showUser = !this.showUser;
    if(this.showUser){
      this.http.get("http://localhost:3000/users").
      subscribe((data) => this.userList=data)
    }
    
  } 

}
