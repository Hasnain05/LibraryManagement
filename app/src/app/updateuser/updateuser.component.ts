import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { DataService } from '../data.service'
import { UsersService } from '../users.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  id;
  name;
  age;
  email;
  successUpdateAlert = false;
  errorUpdateAlert = false;
  page = "admin";
  token;
    
  constructor(private userService : UsersService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.id = this.route.snapshot.params['id'];
    let url = "http://localhost:3000/users/" + this.id;
    this.userService.updateAuthUser(url,{},this.token).subscribe((data) => { 
      this.setTextField(data);
     }, (error: HttpErrorResponse) => {
      
    });
  }

  setTextField(data){
    this.name = data.name;
    this.age = data.age;
    this.email = data.email;
  }

  onUpdateUser(form: NgForm) {
    const value = form.value;
    const user = {};
    if (value.name != "")
      Object.assign(user, { name: value.name });
    if (value.age != "" && value.age != null)
      Object.assign(user, { age: value.age });
    if (value.email != "")
      Object.assign(user, { email: value.email });
    let url = "http://localhost:3000/users/" + this.id;
    this.userService.updateAuthUser(url,user,this.token).subscribe((data) => { this.successUpdateAlert = true; }, (error: HttpErrorResponse) => {
      this.errorUpdateAlert = true;
    });
  }
}
