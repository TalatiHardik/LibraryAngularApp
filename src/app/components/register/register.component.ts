import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  questions: any[] | undefined;
  user: any[] | undefined;
  defaultValue: number | undefined;
  x: string = '';
  y: string = '';
  cnpwd = '';
  z: string = '';
  selectedFile!: File;
  showerror : boolean = false;
  
  @ViewChild('f') regForm: NgForm | undefined;

  constructor(private userService: UserService, private router: Router , private toastr: ToastrService) { }
  ngOnInit(): void {
  }



  onSubmit() {
    if(this.regForm?.value)
      this.regForm.value.city = this.regForm.value.city + ', ' + this.regForm.value.hno + ', ' + this.regForm.value.street + ', ' + this.regForm.value.lm + ', ' + this.regForm.value.cs + ', ' + this.regForm.value.country;
    console.log(this.regForm?.value.pwd);
    if(this.regForm?.value.pwd)
      this.regForm.value.pwd = CryptoJS.SHA1(this.regForm?.value.pwd).toString();
  console.log(this.regForm?.value.pwd);
    this.user = this.regForm?.value;
    console.log(this.user);
    console.log("Image :");
    this.userService.registerUser(this.user ,this.selectedFile).subscribe(
      (response) => {
        //alert("Registered Successfully redirecting to login");
        this.toastr.success('Registered Successfully');
        this.goTo('login')
      },
      (error) => {
        //alert("Error while filing form check details or Use new email to sign up");
        console.log(error);
        this.toastr.error('Email or Username already exsist');
      }
    );
  }
  goTo(path: string) {
    this.router.navigate(['/' + path]);
  }

  

  validatePwd() {
    if(this.regForm?.value != undefined){
      if(this.cnpwd!==this.regForm.value.pwd) {
        this.x="Password's did'nt match";
        this.y='1px solid red';
      }
      else {
        this.x='';
        this.y='';
      }
  }
  }
  validateAge() {
    let a = new Date();
    if(this.regForm?.value.dob != undefined){
      let b = new Date(this.regForm.value.dob);
      let y = a.getUTCFullYear()-b.getUTCFullYear();
      let m = a.getUTCMonth()-b.getUTCMonth();
      let d = a.getUTCDate()-b.getUTCDate();
        
      if(y>18 || y===18 && m>=0 && d>=0) {
        this.z='';
      }
      else {
        this.z='Age should be >=18';
      }
    }
      
  }
  
  bindingImage(event: any){
    //console.log(event.target.files[0].name);
    //console.log(event);
    //console.log(event.target.files[0].name);
    this.selectedFile= event.target.files[0];
    console.log(this.selectedFile.size);
    if(this.selectedFile.size <= 1048756)
    {
      this.showerror=false;
    }
    else{
      this.showerror=true;
    }
  
  }
}

