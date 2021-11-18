import { ConstantPool } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user.service';
import * as CryptoJS from 'crypto-js';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AuthenticationResponse } from 'src/app/models/authenticationResponse.model';
import { AuthenticationRequest } from 'src/app/models/authenticationRequest.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  user: any;
  authenicationRequest : AuthenticationRequest | undefined;
  @ViewChild('f') loginForm: NgForm | undefined;
  constructor(private router: Router, private userService: UserService , private toastr: ToastrService , private localStorageService : LocalstorageService) { }

  ngOnInit(): void {
    /* this.user = sessionStorage.getItem("user");
     if(this.user != null || this.user != undefined){
       this.goTo("home");
     }
 */
  }

  onSubmit() {
    console.log(this.loginForm?.value);
    console.log(this.loginForm?.value.password);
    let pwd = CryptoJS.SHA1(this.loginForm?.value.password).toString();
    this.authenicationRequest = new AuthenticationRequest(this.loginForm?.value.userName , pwd);
    console.log(this.authenicationRequest);
    this.userService.loginUser(this.authenicationRequest).subscribe(
      (response : AuthenticationResponse) => {
        //console.log(response.jwt);  
          //sessionStorage.setItem("user", JSON.stringify(user));
          //this.user = sessionStorage.getItem("user");
          //console.log(user);
          //alert("Logged in successfully redirecting to home");

          this.localStorageService.setJwt(response.jwt);
          this.userService.getUserName(this.localStorageService.getJwt()).subscribe(
            (user)=>{
              this.toastr.success("Welcome "+user.fname);    
              this.localStorageService.setUserData(user.fname);
              this.navigateTo("home");
            },
            (error) => {
              this.toastr.success(error);    
            }
          );
      },
      (error) => {
         if (error.statusText == "Forbidden") {
           console.log(error);
          this.toastr.error("Invalid Credentials");
        }
        else{
          this.toastr.error("Server Down");
        }
        
      }
    );
  }
  navigateTo(path: string) {
    this.router.navigate(['/' + path]);
  }
  navigateToFp(path: string) {
    this.router.navigate(['/' + path]);
  }

  

}
