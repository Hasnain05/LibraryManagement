import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorAlert = false;

  constructor(private http : HttpClient,public router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form : NgForm){
    this.http.post("http://localhost:3000/login/user",form.value).subscribe((data)=>{
      this.login(data);
    },
    (error)=>{
      this.errorAlert = true;
      this.router.navigate(['/home']);
    })
  }

  login(data){
    this.router.navigate(['/user',data.token])
  }

}
