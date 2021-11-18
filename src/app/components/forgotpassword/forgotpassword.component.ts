import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  x: string = '';
  y: string = '';
  cnpwd = '';
  @ViewChild('f') cpForm: NgForm | undefined;
  constructor(private userService: UserService, private router: Router , private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(user: User){
    user.pwd = CryptoJS.SHA1(user.pwd).toString();
    this.userService.forgotPassword(user).subscribe(
      (response) => {
        //alert("Reset Password Successfully redirecting to login");
        this.toastr.success("Reset Password Successfully redirecting to login");
        this.goTo('login')
      },
      (error) => {
        //alert("Error while reseting password try again");
        this.toastr.error("Error while reseting password try again");
      }
    );
  }
  goTo(path: string) {
    this.router.navigate(['/' + path]);
  }
  validatePwd() {
    if(this.cpForm != undefined){
      if(this.cnpwd!==this.cpForm.value.pwd) {
        this.x="Password's did'nt match";
        this.y='1px solid red';
      }
      else {
        this.x='';
        this.y='';
      }
    }
  }

}
