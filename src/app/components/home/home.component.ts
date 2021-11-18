import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private userService : UserService,private router: Router, private bookService: BookService ,private localStorageService : LocalstorageService , private toastr: ToastrService) { }
  user: any;
  cartSize: number = 10;
  login : Boolean = false;
  userObject : any;
  retrievedImage : any;
  base64Data : any;
  
  ngOnInit(): void {
    //var item = sessionStorage.getItem('user');
    //this.user = item ? JSON.parse(item) : {};
    this.user = this.localStorageService.getUserData();
    this.login = this.localStorageService.checkUserLoggedin();
    if(this.login == true){
      this.getCartSize();
      this.getUserData();
    }
    console.log(this.user);
  }
  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

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

  signOut(){
    this.localStorageService.removeData('userData');
    this.localStorageService.removeData('Authorization');
    this.toastr.success("Successfully Logout");
    this.navigateTo("");
  }

}
