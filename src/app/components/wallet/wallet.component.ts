import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Wallet } from 'src/app/models/wallet.model';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { WalletService } from 'src/app/services/wallet.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  constructor(private userService: UserService, private router: Router , private toastr: ToastrService , private walletService: WalletService , private localStorageService: LocalstorageService) { }
  wallet!: Wallet;
  amount : number = 0;
  ngOnInit(): void {
    this.getWallet();
  }

  
  navigateTo(path: string): void {

    this.router.navigate([`/${path}`]);

  }
  //Method to get wallet
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

  addToWallet(){
    this.walletService.addToWallet(this.localStorageService.getJwt(),this.amount).subscribe(
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

}
