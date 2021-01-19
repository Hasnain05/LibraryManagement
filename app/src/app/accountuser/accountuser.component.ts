import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accountuser',
  templateUrl: './accountuser.component.html',
  styleUrls: ['./accountuser.component.css']
})
export class AccountuserComponent implements OnInit {
  token;

  constructor(private route: ActivatedRoute,private http : HttpClient,public router: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token']
  }

  onLogOut(){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
      this.http.post("http://localhost:3000/logout/user", {}, { headers }).subscribe((data) => {
        this.router.navigate(['/home'])
    })
  }

}
