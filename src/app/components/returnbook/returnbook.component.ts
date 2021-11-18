import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Wallet } from 'src/app/models/wallet.model';
import { BookService } from 'src/app/services/book.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ReturnbookService } from 'src/app/services/returnbook.service';
import { WalletService } from 'src/app/services/wallet.service';
import { UserService } from 'src/app/user.service';
import { CheckedOutBookModel } from './checkedoutbook.model';


@Component({
  selector: 'app-returnbook',
  templateUrl: './returnbook.component.html',
  styleUrls: ['./returnbook.component.css']
})
export class ReturnbookComponent implements OnInit {
  searchText: string = "";
  cartBooks: CheckedOutBookModel[] = [];
  size: number = 0;
  user : any;
  page: number = 1;
  total: number = 30;
  login : Boolean = false;
  cartSize : number = 0;
  wallet!: Wallet;
  retrievedImage : any;
  base64Data : any;
  userObject : any;
  bookImage : any;
  base64Data2 : any;

  constructor(private userService: UserService , private returnBookService: ReturnbookService, private router: Router , private toastr: ToastrService , private localStorageService : LocalstorageService , private bookService : BookService , private walletService: WalletService) {
   
  }
  ngOnInit() {
    this.login = this.localStorageService.checkUserLoggedin();
    if(this.login == false){
      this.toastr.warning("Login Required");
      this.redirectToLogin();
    }
    else{
        this.user = this.localStorageService.getUserData();
       this.onLoad();
    }
    
   }

   onLoad(){
    this.getAllCustomerBooks(); 
    this.getWallet();
    this.getCartSize();
    this.getUserData();
   }
 
   
   getAllCustomerBooks(){
    this.returnBookService.getAllReturnBooks(this.localStorageService.getJwt()).subscribe(
      (response: CheckedOutBookModel[]) => {
        this.cartBooks = [];
        this.cartBooks = response;
        console.log(this.cartBooks);
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
          
      }
      },
      (error) => {
       // alert(error.message); 
       console.log(error);
        this.toastr.success("Server Error");
      }
    );
  }

//Method to return books which are with user
  returnBook(Book:CheckedOutBookModel ){
    this.returnBookService.returnBook(Book.orderid,Book.name,this.localStorageService.getJwt()).subscribe(
      (response) => {
          this.toastr.success("Book returned successfully");
          this.getAllCustomerBooks();
          this.onLoad();
      },
      (error) => {
        //alert(error.message); 
        console.log(error);
        console.log(Book);
        if(error.error.msge == "Insufficient balance"){
          this.toastr.error("Insufficient Wallet balance");
        }else{
        this.toastr.error("Server Error");
      }
      }
    );
  }


  imageConversion(image : any){
    this.base64Data2 = image;;
    this.bookImage = 'data:image/jpeg;base64,' + this.base64Data2;
    return this.bookImage;
  }


  //Router method to navigate through angular app
  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
  //Router method to redirect to login
  redirectToLogin(): void {
    this.router.navigate(['login'], {replaceUrl:true});
  }

  //Method to get cart size
  getCartSize(): void {
    this.bookService.getCartSize(this.localStorageService.getJwt()).subscribe(
      (size) => {
        this.cartSize = size;
      },
      (error) => {
        console.log(error);
      }
    );
    //return this.bookService.getCartSize();
  }

  // Metho to Get wallet 
  getWallet(){
    this.walletService.getWallet(this.localStorageService.getJwt()).subscribe(
      (response) => {
        this.wallet = response;
        console.log(this.wallet);
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

  getUserData(){
    this.userService.getUserObject(this.localStorageService.getJwt()).subscribe(
      (response : any) => {
        this.userObject = response;
        //alert("Details edited succcessfully");
        console.log(this.userObject);
        this.base64Data = this.userObject.image;;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      },
      (error) => {
        console.log(error);
        this.toastr.error("Server Error");
      } 
    );
  }
  


}
