import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.component.html',
  styleUrls: ['./accountdetails.component.css']
})
export class AccountdetailsComponent implements OnInit {

  constructor(private userService : UserService ,private router: Router , private toastr: ToastrService , private localStorageService: LocalstorageService) { }

  retrievedImage : any;
  base64Data : any;
  userObject : any;
  ngOnInit(): void {
    this.getUserData();
  }
  signOut(){
    this.localStorageService.removeData('userData');
    this.localStorageService.removeData('Authorization');
    this.toastr.success("Successfully Logout");
    this.navigateTo("");
  }
  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
  links = [
    {
      label: 'MyAccount',
      path: 'myaccount',
      index: 0
    }, {
      label: 'Wallet',
      path: 'wallet',
      index: 1
    }, {
      label: 'Order',
      path: 'orders',
      index: 2
    },

  ]
  activeLink = this.links[0];
  background = '';
  toggleBackground() {
    this.background = this.background ? '' : 'black';

  }
  imageConversion(image : any){
    this.base64Data = image;;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    return this.retrievedImage;
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

