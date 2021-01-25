import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from 'angularx-social-login';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { updateLanguageServiceSourceFile } from 'typescript';
import { BooksComponent } from './books/books.component';
import { UpdatebookComponent } from './updatebook/updatebook.component';
import { WithdrawdepositComponent } from './withdrawdeposit/withdrawdeposit.component';
import { LoginComponent } from './login/login.component';
import { AccountuserComponent } from './accountuser/accountuser.component';
import { PublicbooksComponent } from './publicbooks/publicbooks.component';

const config = new AuthServiceConfig([
  {
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider('1064431252775-ni8f4ht40bq6pqbgffcea1imjrs0peb4.apps.googleusercontent.com')
  }
  ]);

 export function provideConfig() {
  return config;
  }

const appRoutes: Routes = [
  {path:'',component: PublicbooksComponent},
  {path:'home',component: LoginComponent},
  {path:'users',component: UsersComponent},
  {path:'books',component: BooksComponent},
  {path:'users/:id/edit',component:UpdateuserComponent},
  {path:'books/:id/edit',component:UpdatebookComponent},
  {path:'users/:id/books',component:WithdrawdepositComponent},
  {path:'user',component:AccountuserComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UpdateuserComponent,
    UpdatebookComponent,
    BooksComponent,
    WithdrawdepositComponent,
    LoginComponent,
    AccountuserComponent,
    PublicbooksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2OrderModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    SocialLoginModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
