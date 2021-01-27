import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Library Management App';
  isCollapsed = false;
  login = true;
  users = false;
  books = false;

  constructor(public router: Router,private userService : UsersService,private authService: AuthService) { }

  onActivate(e){
    if(e.page==='admin'){
      this.login = false;
      this.users = true;
      this.books = true;
    }else if(e.page==='user'){
      this.login = false;
    }else{
      this.login = true;
      this.users = false;
      this.books = false;
    }
  }

  onLogOut(){
    const token = localStorage.getItem('token')
    localStorage.removeItem('token')
    this.authService.signOut();
    this.userService.logoutUser(token).subscribe((data) => {
      this.router.navigate(['/home'])
    })
  }

  onLogIn(){
    this.router.navigate(['/home'])
  }
  
}
