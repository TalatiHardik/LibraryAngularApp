import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BookComponent } from './components/book/book.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { Filter1Pipe } from './pipes/filter1.pipe';
import { ReturnbookComponent } from './components/returnbook/returnbook.component'
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from "@angular/material/dialog";
import { DailogComponent } from './components/dailog/dailog.component';
import { BookDescriptionComponent } from './components/book-description/book-description.component';
import { AccountdetailsComponent } from './components/accountdetails/accountdetails.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BookComponent,
    MyaccountComponent,
    CartComponent,
    ForgotpasswordComponent,
    Filter1Pipe,
    ReturnbookComponent,
    DailogComponent,
    BookDescriptionComponent,
    AccountdetailsComponent,
    OrdersComponent,
    WalletComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    ToastrModule.forRoot(      
      {        
        timeOut: 3000,        
        positionClass: 'toast-top-right'      
      }    
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
