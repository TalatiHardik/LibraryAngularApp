import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/finedOrder.model';
import { Myaccountuser } from 'src/app/models/myaccountuser';
import { Wallet } from 'src/app/models/wallet.model';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ReturnbookService } from 'src/app/services/returnbook.service';
import { WalletService } from 'src/app/services/wallet.service';

import { UserService } from 'src/app/user.service';
import { CheckedOutBookModel } from '../returnbook/checkedoutbook.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  wallet! : Wallet;
  orders! : Order[];
  individualOrder! : Order[];
  login:Boolean = false;
  orderlist = new Set();
  returnOrderListId = new Set();
  itr : number = 0;
  flag : Boolean = false;
  returnOrderList: CheckedOutBookModel[] = [];
  user: any;
  page: number = 1;
  page1: number = 1;
  total: number = 30;
  olist: any[] = [];
  rlist: any[] = [];

  @ViewChild('f') regForm: NgForm | undefined;
  z: string = '';
  constructor(private returnBookService: ReturnbookService ,private userService: UserService, private router: Router , private toastr: ToastrService , private localStorageService: LocalstorageService , private walletService: WalletService) {
    this.user = this.localStorageService.getUserData();
  }

  ngOnInit() {
    
    this.login = this.localStorageService.checkUserLoggedin();
    if(this.login == false){
      this.toastr.warning("Login Required");
      this.redirectToLogin();
    }
    else{
      //this.getOrder();
      this.getAllOrder();
      this.getAllCustomerBooks();
    }

  }
  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
  redirectToLogin(): void {
    this.router.navigate(['login'], {replaceUrl:true});
  }

  
  
  getOrder(){
    this.walletService.getWallet(this.localStorageService.getJwt()).subscribe(
      (response) => {
        this.wallet = response;
        this.orders = this.wallet.orders;
        this.orderlistgenerate(this.orders);
        console.log(this.wallet);
        console.log(this.orders);
      },
      (error) => {
        console.log(error);
        this.toastr.error("Server Error");
      }
    ); 

    
  }

  getAllOrder(){
    this.walletService.getAllOrder(this.localStorageService.getJwt()).subscribe(
      (response) => {
      //this.wallet = response;
        this.olist = response;
        console.log(response);
        
      },
      (error) => {
        console.log(error);
        this.toastr.error("Server Error");
      }
    ); 
  }

  getIndividualOrder(ordeId : any){
    this.walletService.getOrder(this.localStorageService.getJwt() , ordeId).subscribe(
      (response) => {
      //this.wallet = response;
        this.individualOrder = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
        this.toastr.error("Server Error");
      }
    ); 
  }




  signOut(){
    this.localStorageService.removeData('userData');
    this.localStorageService.removeData('Authorization');
    this.toastr.success("Successfully Logout");
    this.navigateTo("");
  }
  returnOrderListIdgenerate(returnOrderList: CheckedOutBookModel[]){
    returnOrderList.forEach(returnOrderList => {
      this.returnOrderListId.add(returnOrderList.orderid);  
    });
    this.rlist = Array.from(this.returnOrderListId.values());
  }

  orderlistgenerate(orders :Order[]){
    orders.forEach(order => {
      this.orderlist.add(order.orderId);  
    });
    this.olist = Array.from(this.orderlist.values());
  }

  resetitr(){
    this.itr = 0;
  }
  incritr(){
    return this.itr += 1;
  }
  
  getAllCustomerBooks(){
    this.returnBookService.getAllReturnBooks(this.localStorageService.getJwt()).subscribe(
      (response: CheckedOutBookModel[]) => {
        this.returnOrderList = [];
        this.returnOrderList = response;
        this.returnOrderListIdgenerate(this.returnOrderList);
        console.log(this.returnOrderList);  
      },
      (error) => {
       // alert(error.message); 
       console.log(error);
        this.toastr.success("Return Book Server Error");
      }
    );
  }
  isComplete(orderId : any){
    this.flag = false;
    this.returnOrderListId.forEach(key => {
      if(orderId == key){
        this.flag = true;
      }
    });
    return this.flag;
  }

  generatInvoice(orderId : any , bookName : any){
    this.walletService.generateInvoice(orderId , bookName).subscribe(
      (response) => {
        if(response.msge){
          this.toastr.success("Invoice Downloaded")
            
        }
        console.log(this.wallet);
          console.log(this.orders);
      },
      (error) => {
        console.log(error);
        this.toastr.error("Server Error");
      }
    ); 


  }

  //href="http://localhost:8084/wallet"

/*
  var or = this.cartBooks[0].orderid;
        console.log("Order id"+or);
        for (var key in this.cartBooks) {
          if(or == this.cartBooks[key].orderid){
            console.log(this.cartBooks[key]); 
          }
          else{
            or = this.cartBooks[key].orderid;
            console.log("Order id"+or);
            console.log(this.cartBooks[key]); 
          }
*/
 
}

