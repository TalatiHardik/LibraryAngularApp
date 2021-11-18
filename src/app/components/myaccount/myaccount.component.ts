import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Myaccountuser } from 'src/app/models/myaccountuser';
import { LocalstorageService } from 'src/app/services/localstorage.service';

import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent {

  user : Myaccountuser = new Myaccountuser();
  login:Boolean = false;
  @ViewChild('f') regForm: NgForm | undefined;
  z: string = '';
  retrievedImage : any;
  base64Data : any;
  selectedFile!: File ;
  showerror : boolean = false;
  
  constructor(private userService: UserService, private router: Router , private toastr: ToastrService , private localStorageService: LocalstorageService) {
  }

  ngOnInit() {
    
    this.login = this.localStorageService.checkUserLoggedin();
    if(this.login == false){
      this.toastr.warning("Login Required");
      this.redirectToLogin();
    }
    else{
      this.getUserData();
    }

  }
  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
  redirectToLogin(): void {
    this.router.navigate(['login'], {replaceUrl:true});
  }

  onSubmit(){
    console.log(this.user);
    this.userService.editUser(this.localStorageService.getJwt() ,this.user , this.selectedFile? this.selectedFile : undefined).subscribe( 
      (response) => {
     // alert("Details edited succcessfully");
      this.toastr.success("Details edited succcessfully");
      this.navigateTo('accountdetails/myaccount')
    },
    (error) => {
      //alert("Error while filing form check details");
      this.toastr.error("Server Error");
    });
  }
  getUserData(){
    this.userService.getUserObject(this.localStorageService.getJwt()).subscribe(
      (response : any) => {
        this.user = response;
        //alert("Details edited succcessfully");
        this.base64Data = response.image;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        console.log(this.selectedFile);
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
      var reader=new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (_event) =>{
        this.retrievedImage=reader.result;
      }
    }
    else{
      this.showerror=true;
    }
  
  }
}
