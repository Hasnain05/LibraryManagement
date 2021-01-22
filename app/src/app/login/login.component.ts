import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorAlert = false;
  private user: SocialUser;

  constructor(private usersService : UsersService,private http : HttpClient,public router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if(user)
        this.onGoogleLogin(user)
    });
    if(localStorage.getItem('token')){
      this.usersService.getAuthUser("http://localhost:3000/users/me",localStorage.getItem('token')).subscribe((data)=>{
        this.redirect(data)
      })
    }
  }

  redirect(data){
    if(data.role==='admin'){
      this.router.navigate(['/users'])
    }else{
      this.router.navigate(['/user'])
    }
  }

  onGoogleLogin(user){
    let body = {
      token: user.idToken
    }
    this.http.post("http://localhost:3000/login/google",body).subscribe((data)=>{
      this.login(data);
    },
    (error)=>{
      this.errorAlert = true;
      this.router.navigate(['/home']);
    })
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
    localStorage.setItem('token',data.token)
    if(data.user.role==='admin'){
      this.router.navigate(['/users'])
    }else{
      this.router.navigate(['/user'])
    }
  }

  signIn (){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }  

  test(){
    this.authService.signOut();
  }
}
