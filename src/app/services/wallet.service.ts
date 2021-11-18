import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient, private localStorageService: LocalstorageService) { }
  public getWallet(jwt : any): Observable<any>{
    let fname = this.localStorageService.getUserData();
    return this.http.get<any>(`http://localhost:8765/wallet-ms/wallet/${fname}`,{
      headers:{'Authorization': jwt}
    });
  }

  public addToWallet(jwt : any , amount : number){
    let fname = this.localStorageService.getUserData();
    return this.http.put<any>(`http://localhost:8765/wallet-ms/wallet/addToWallet/${fname}/${amount}`,"",{
      headers:{'Authorization': jwt}
    });

  }

  public generateInvoice(orderId : any , bookName : any){
    let fname = this.localStorageService.getUserData();
    return this.http.get<any>(`http://localhost:8765/wallet-ms/wallet/generate-invoice/${fname}/${orderId}/${bookName}`);
  }


  public getAllOrder(jwt : any){
    let fname = this.localStorageService.getUserData();
    return this.http.get<any>(`http://localhost:8765/wallet-ms/wallet/get-order-ids/${fname}`,{
      headers:{'Authorization': jwt}
    });
  }

  public getOrder(jwt : any , orderId : any){
    let fname = this.localStorageService.getUserData();
    return this.http.get<any>(`http://localhost:8765/wallet-ms/wallet/get-order-details/${fname}/${orderId}`,{
      headers:{'Authorization': jwt}
    });
  }

}
