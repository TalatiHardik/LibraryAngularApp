import { ObserversModule } from '@angular/cdk/observers';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BookModel } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ReturnbookService } from 'src/app/services/returnbook.service';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';
import { CheckedOutBookModel } from '../returnbook/checkedoutbook.model';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  searchText: string = "";
  filterAuthor: string = ""
  filterGenre: string = ""
  isBookListEmpty: boolean = false
  cartSize: number = 0;
  collapsed = true;
  books: BookModel[] = [];
  cartBooks: BookModel[] = [];
  returnBooks: CheckedOutBookModel[] = [];
  user: any;
  page: number = 1;
  total: number = 30;
  login: Boolean = false;
  buttonValue: string = "Add To Cart";
  retrievedImage : any;
  base64Data : any;
  userObject : any;
  bookImage : any;
  base64Data2 : any;

 ngOnInit() {
  this.login = this.localStorageService.checkUserLoggedin();
  if(this.login == false){
    this.toastr.warning("Login Required");
    this.redirectToLogin();
  }
  else{
    this.onLoad();
  }
   
  }

  onLoad(){
    this.getCartSize();
    this.getAllBooks();
    this.getAllCustomerBooks();
    this.getAllReturnBooks();
    this.getUserData();
  }
  constructor(private userService : UserService , private returnBookService: ReturnbookService ,private router: Router, private bookService: BookService , private toastr: ToastrService ,private localStorageService : LocalstorageService) {
  }

  //Method to add to cart from book list to cart
  addToCart(book: BookModel) {
    if(!this.checkInCart(book) && !this.checkInReturn(book)){
    this.bookService.addToCart(book, this.localStorageService.getJwt()).subscribe(
      (status) => {
        if(status.msge == "Successful"){
          this.toastr.success('Item Added');
          this.onLoad();
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

  //Method to get all customer books
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



  //Redirect to login method
  redirectToLogin(): void {
    this.router.navigate(['login'], {replaceUrl:true});
  }

  //Method to get list of authors
  getAllAuthors(): string[] {
    return [... new Set(this.books.map(b => b.author))]
  }

  //Method to get list of genres
  getAllGenres(): string[] {
    return [... new Set(this.books.map(b => b.genre))]
  }


  //Method to get list of all books present in library
  getAllBooks(){
    this.bookService.getAllBooks(this.localStorageService.getJwt()).subscribe(
      (response: BookModel[]) => {
        this.books = response;
        console.log(this.books);
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


  //Sign out metho
  signOut(){
    this.localStorageService.removeData('userData');
    this.localStorageService.removeData('Authorization');
    this.toastr.success("Successfully Logout");
    this.navigateTo("");
  }

  //Router method to navigate through angular app
  navigateTo(path: string, bookName?: BookModel): void {
    if (bookName) {
      this.bookService.setBookName(bookName)
    }
    this.router.navigate([`/${path}`]);
  }

  //Method to check if book is already present with user in cart
  checkInCart(book: BookModel){
    return this.cartBooks.find(cartBook => cartBook.name == book.name)
  }

  //Method to check if book is already issued with user
  checkInReturn(book: BookModel){
    return this.returnBooks.find(returnBooks => returnBooks.name == book.name)
  }

  //Method to Get all books which are with user
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

  //Method to Reset filters
  resetfilter(){
    this.filterAuthor = ""
    this.filterGenre = ""
  }

}
