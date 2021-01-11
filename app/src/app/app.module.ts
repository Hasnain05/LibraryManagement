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



const appRoutes: Routes = [
  {path:'users',component: UsersComponent},
  {path:'users/:id/edit',component:UpdateuserComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UpdateuserComponent
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
