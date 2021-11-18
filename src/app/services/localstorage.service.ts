import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  constructor() { }

  setUserData(data:any) {
    const jsonData = JSON.stringify(data)
    localStorage.setItem('userData', jsonData)
  }
  
  getUserData() {
      return JSON.parse(localStorage.getItem('userData') || '');
  }


  setJwt(data:any) {
    localStorage.setItem('Authorization', 'Bearer '+data)
  }
  
  getJwt() {
      return localStorage.getItem('Authorization');
  }

  
  removeData(key:string) {
      localStorage.removeItem(key)
  }
  
  checkUserLoggedin() : Boolean{
    if(localStorage.getItem('userData') != null){
      return true;
    }
    return false;
  }
}
