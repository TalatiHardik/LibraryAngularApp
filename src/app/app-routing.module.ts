import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountdetailsComponent } from './components/accountdetails/accountdetails.component';
import { BookDescriptionComponent } from './components/book-description/book-description.component';
import { BookComponent } from './components/book/book.component';
import { CartComponent } from './components/cart/cart.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RegisterComponent } from './components/register/register.component';
import { ReturnbookComponent } from './components/returnbook/returnbook.component';
import { WalletComponent } from './components/wallet/wallet.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "book", component: BookComponent },
  { path: "myaccount", component: MyaccountComponent },
  { path: "cart", component: CartComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: 'bookd', component: BookDescriptionComponent},
  { path: 'returnbook', component: ReturnbookComponent },
  {path: 'accountdetails', component: AccountdetailsComponent,
  children: [
    { path: 'myaccount', component: MyaccountComponent },
    { path: 'wallet', component: WalletComponent },
    { path: 'orders', component: OrdersComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
