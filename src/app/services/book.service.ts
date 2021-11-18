import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookModel } from '../models/book.model';
import { LocalstorageService } from './localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  
  cartBooks: BookModel[] =[];
  currentBookName!: BookModel ;
  user: any;

  constructor(private http: HttpClient ,private localStorageService : LocalstorageService) {
  }

  //Method to get all books
  public getAllBooks(jwt : any): Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8765/show-books-ms/books/get-all-books`, {
      headers:{'Authorization': jwt}
    });
    
  }

  //Method to check out cart
  public checkoutCart(jwt : any): Observable<any>{
    let fname = this.localStorageService.getUserData();
    return this.http.post<any>(`http://localhost:8765/orders-ms/orders/process-order/${fname}`, "", {
      headers:{'Authorization': jwt}
    });

  }

  //Method to get all customer books
  public getAllCustomerBooks(jwt : any): Observable<any[]>{
    let fname = this.localStorageService.getUserData();
    return this.http.get<any[]>(`http://localhost:8765/cart-ms/get-cart/${fname}`, {
      headers:{'Authorization': jwt}
    });
    
  }

  //Method to remove cart item from cart
  public removeCartItem(bookName: string , jwt : any): Observable<any>{
    let fname = this.localStorageService.getUserData();
    return this.http.delete<any>(`http://localhost:8765/cart-ms/remove-book/${fname}/${bookName}`, {
      headers:{'Authorization': jwt}
    });
    
  }
  getCartSize(jwt : any) {
    let fname = this.localStorageService.getUserData();
    return this.http.get<number>(`http://localhost:8765/cart-ms/get-cart-size/${fname}`, {
      headers:{'Authorization': jwt}
    });
  }



  /*addToCart(book: BookModel) {

    this.cartBooks.push(book);

    localStorage.setItem('cartBooks', JSON.stringify(this.cartBooks));

    const headers = { 'content-type': 'application/json' }
    //const body=JSON.stringify(name);
    console.log(book);

    const params = new HttpParams().set('book', JSON.stringify(book));
    //console.log(" url "+"http://localhost:8080/add-to-cart/"+bookname);
    this.http.post("http://localhost:8080/add-to-cart/", params);
    console.log("method called");
  }
*/
addToCart(book: BookModel, jwt : any): Observable<any> {
  let fname = this.localStorageService.getUserData();
  return this.http.post<any>(`http://localhost:8765/cart-ms/add-to-cart/${fname}/${book.name}`,"", {
    headers:{'Authorization': jwt}
  });
}

getBookName(): BookModel {
  this.currentBookName = JSON.parse(localStorage.getItem('currentBookName') || '[]');
  return this.currentBookName;
}



setBookName(bookName: BookModel) {
  //this.currentBookName = bookName;
  localStorage.setItem('currentBookName', JSON.stringify(bookName));
  console.log(this.currentBookName)
}

  findByName(name: string): Observable<any> {
    return this.http.get("http://localhost:8080/find-by-name/" + name);
  }

  

}


