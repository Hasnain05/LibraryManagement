import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  showUser = false;
  showAddUser = false;
  showUpdateUser = false;
  showGetUser = false;
  status = "No user created yet";
  userList;
  successAddAlert = false;
  errorAddAlert = false;
  successUpdateAlert = false;
  errorUpdateAlert = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onAddUser(form:NgForm){
    const user = form.value;
    this.http.post("http://localhost:3000/users", user).subscribe((data) => {console.log(data);this.successAddAlert=true;}, (error: HttpErrorResponse) => {
      this.errorAddAlert=true;
    });
  } 

  onUserList(){
    this.showUser = !this.showUser;
    if(this.showUser){
      this.http.get("http://localhost:3000/users").
      subscribe((data) => this.userList=data)
    }
  } 

  onUpdateUser(form:NgForm){
    const value = form.value;
    const user={};
    if (value.name != "")
      Object.assign(user, { name: value.name });
    if (value.age != "" && value.age != null)
      Object.assign(user, { age: value.age });
    if (value.email != "")
      Object.assign(user, { email: value.email });
    this.http.put("http://localhost:3000/users/"+value._id, user).subscribe((data) => { console.log(data); this.successUpdateAlert = true; }, (error: HttpErrorResponse) => {
      this.errorUpdateAlert = true;
    });
  }

  onGetUser(form:NgForm){
    const value = form.value;
    let user;
    this.http.get("http://localhost:3000/users/"+value._id).
    subscribe((data) => console.log(data))
  }

}
