import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookModel } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ReturnbookService } from 'src/app/services/returnbook.service';
import { UserService } from 'src/app/user.service';
import { CheckedOutBookModel } from '../returnbook/checkedoutbook.model';


@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.css']
})
export class BookDescriptionComponent implements OnInit {

  book: BookModel;
  cartBooks: BookModel[] = [];
  cartSize: number = 0;
  returnBooks: CheckedOutBookModel[] = [];
  retrievedImage : any;
  base64Data : any;
  userObject : any;
  bookImage : any;
  base64Data2 : any;
  
  constructor(private userService: UserService ,private returnBookService: ReturnbookService,private router: Router, private bookService: BookService, private toastr: ToastrService ,private localStorageService : LocalstorageService) { 
    this.book = this.bookService.getBookName()
    //console.log(this.bookName);
  }

  ngOnInit(): void {
    this.onload();
    
  }

  onload(){
    this.getAllCustomerBooks();
    this.getAllReturnBooks();
    this.getCartSize();
    this.getUserData();
  }

  //Router method to navigate through angular app
  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
  getAllCustomerBooks(){
    this.bookService.getAllCustomerBooks(this.localStorageService.getJwt()).subscribe(
      (response: BookModel[]) => {
        this.cartBooks = response;
        console.log(response);
      },
      (error) => {
        //alert(error.message); 
        this.toastr.error('Server Error');
      }
    );
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
  
  imageConversion(image : any){
    this.base64Data2 = image;;
    this.bookImage = 'data:image/jpeg;base64,' + this.base64Data2;
    return this.bookImage;
  }

  
  checkInCart(book: BookModel){
    return this.cartBooks.find(cartBook => cartBook.name == book.name)
  }
  checkInReturn(book: BookModel){
    return this.returnBooks.find(returnBooks => returnBooks.name == book.name)
  }

  
//Method to add to cart from book list to cart
  addToCart(book: BookModel) {
    this.bookService.addToCart(book, this.localStorageService.getJwt()).subscribe(
      (status) => {
        if(status.msge == "Successful"){
          this.toastr.success('Item Added');
          this.getAllCustomerBooks();
          this.getCartSize();
        }
        else{
          this.toastr.error('Item not added (Server error)');
        }
      },
      (error) => {
        //alert(error.message);
        console.log(error);
        this.toastr.error('Server error');
      }
    );
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
//Method to get all return books
  getAllReturnBooks(){
    this.returnBookService.getAllReturnBooks(this.localStorageService.getJwt()).subscribe(
      (response: CheckedOutBookModel[]) => {
        this.returnBooks = [];
        this.returnBooks = response;
        console.log("SSD"+response);
      },
      (error) => {
       // alert(error.message); 
       console.log(error);
        this.toastr.success("Server Error");
      }
    );
  }

  

}
