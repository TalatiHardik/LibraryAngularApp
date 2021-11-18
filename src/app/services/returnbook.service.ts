import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookModel } from '../models/book.model';

import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ReturnbookService {

  constructor(private http: HttpClient , private localStorageService: LocalstorageService) { }
  returnBooks: BookModel[] = [];
  user: any;

  public getAllReturnBooks(jwt : any): Observable<any[]>{
    let fname = this.localStorageService.getUserData();
    return this.http.get<any[]>(`http://localhost:8765/orders-ms/orders/get-all-books-ordered/${fname}`,{
      headers:{'Authorization': jwt}
    });
  }

  public returnBook(orderid : number,bookName : string , jwt : any): Observable<any>{
    let fname = this.localStorageService.getUserData();
    return this.http.delete<any>(`http://localhost:8765/orders-ms/orders/return-book/${fname}/${bookName}/${orderid}`,{
      headers:{'Authorization': jwt}
    });
  }

}
