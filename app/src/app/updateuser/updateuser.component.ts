import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  id;
  successUpdateAlert = false;
  errorUpdateAlert = false;
    
  constructor(private http: HttpClient,private dataService:DataService) { }

  ngOnInit(): void {
    this.id=this.dataService.updateId;
    this.dataService.updateId = "";
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
    this.http.put("http://localhost:3000/users/" + this.id, user).subscribe((data) => { console.log(data); this.successUpdateAlert = true; }, (error: HttpErrorResponse) => {
      this.errorUpdateAlert = true;
    });
  }
}
