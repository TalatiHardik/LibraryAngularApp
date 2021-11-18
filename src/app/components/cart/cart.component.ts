import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookModel } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/user.service';

import { DailogComponent } from '../dailog/dailog.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  searchText: string = "";
  filterAuthor: string = ""
  filterGenre: string = ""
  cartBooks: BookModel[] = [];
  temp: any;
  cartSize: number = 0;
  user: any;
  page: number = 1;
  total: number = 30;
  login : Boolean = false;
  retrievedImage : any;
  base64Data : any;
  userObject : any;
  bookImage : any;
  base64Data2 : any;
  
  

  constructor(private userService : UserService , private bookService: BookService, private router: Router , private toastr: ToastrService , private localStorageService: LocalstorageService , private dailog: MatDialog ) {
    this.user = this.localStorageService.getUserData();
  }
  ngOnInit() {
    
    this.login = this.localStorageService.checkUserLoggedin();
    if(this.login == false){
      this.toastr.warning("Login Required");
      this.redirectToLogin();
    }
    else{
      this.getAllCustomerBooks();
      this.getUserData();
    }
    
   }
 
   //Method to get all customer specific group
   getAllCustomerBooks(){
    this.bookService.getAllCustomerBooks(this.localStorageService.getJwt()).subscribe(
      (response: BookModel[]) => {
        this.cartBooks = response;
        //this.getUtility(this.cartBooks);
        console.log(response);
      },
      (error) => {
        //alert(error.message); 
        this.toastr.error('Server Error');
      }
    );
  }

  imageConversion(image : any){
    this.base64Data2 = image;;
    this.bookImage = 'data:image/jpeg;base64,' + this.base64Data2;
    return this.bookImage;
  }

    //Method to get list of authors
    getAllAuthors(): string[] {
      return [... new Set(this.cartBooks.map(b => b.author))]
    }
  
    //Method to get list of genres
    getAllGenres(): string[] {
      return [... new Set(this.cartBooks.map(b => b.genre))]
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


  
  navigateTo(path: string): void {

    this.router.navigate([`/${path}`]);

  }
  redirectToLogin(): void {
    this.router.navigate(['login'], {replaceUrl:true});
  }

  removeFromCart(Book: BookModel) {
   // this.bookService.removeItemFromCart(bookIndex);
    //this.cartBooks = this.bookService.cartBooks;
    let result = this.dailog.open(DailogComponent, { data: 'Are you sure to remove from cart' });
    result.afterClosed().subscribe(
      (response) =>{
        if(response == 'true'){
          this.bookService.removeCartItem(Book.name , this.localStorageService.getJwt()).subscribe(
            () =>{
              this.getAllCustomerBooks();
              this.toastr.success('Item removed');
            },
            (error) => {
              console.log(error);
              this.toastr.error('Item not removed');
            }
          );
        }
      }

    );
    
    //this.reloadCurrentRoute();
    //window.location.reload();
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  checkoutCart(): void{
    this.bookService.checkoutCart(this.localStorageService.getJwt()).subscribe(
      (data) => {
        console.log(data);
        if(data.msge == "Success"){
          this.toastr.success('Order Placed');
        }
        else{
          this.toastr.toastrConfig.timeOut = 6000;
          this.toastr.warning(data.msge);
        }
        
        this.getAllCustomerBooks();
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error placing order');
      }
    );
    //alert("Order Placed");
    
  }
    //Method to Reset filters
    resetfilter(){
      this.filterAuthor = ""
      this.filterGenre = ""
    }
  



  // getUtility(cartBook: BookModel[]){
  //   cartBook.forEach(book => {
  //     if(book.quantity == null)
  //       book.quantity = 1;
  //   });
  // }

}
