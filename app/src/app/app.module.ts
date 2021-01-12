import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';

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



const appRoutes: Routes = [
  {path:'users',component: UsersComponent},
  {path:'books',component: BooksComponent},
  {path:'users/:id/edit',component:UpdateuserComponent},
  {path:'books/:id/edit',component:UpdatebookComponent},
  {path:'users/:id/books',component:WithdrawdepositComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UpdateuserComponent,
    UpdatebookComponent,
    BooksComponent,
    WithdrawdepositComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2OrderModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
