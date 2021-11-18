import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from './models/authenticationRequest.model';
import { LocalstorageService } from './services/localstorage.service';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private localStorageService : LocalstorageService) {}
  

  public registerUser(user: any ,selectedFile : File): Observable<any> {
    const fd= new FormData();
    fd.append('imageFile', selectedFile, selectedFile.name);
    fd.append('user', JSON.stringify(user));
    //return this.http.post<any>(`http://localhost:8765/authorization-service/authentication/add-user`, fd);
    return this.http.post<any>(`http://localhost:8765/authorization-service/authentication/add-user`,fd);
  }

  public loginUser(loginData: AuthenticationRequest): Observable<any> {
    return this.http.post<User>(`http://localhost:8765/authorization-service/authentication/auth`, loginData);
  }

  public getUserName(jwt :any): Observable<any> {
    
    return this.http.post<User>(`http://localhost:8765/authorization-service/authentication/getName`,"", {
      headers:{'Authorization': jwt}
    });
  }

  public forgotPassword(user: User): Observable<any> {
    return this.http.post<User>(`http://localhost:8765/authorization-service/authentication/reset-pwd`, user);
  }

  public editUser( jwt : any , editData: User ,selectedFile? : File): Observable<any>{
    const fd= new FormData();
    if(selectedFile)
      fd.append('imageFile', selectedFile, selectedFile.name);
      
    fd.append('user', JSON.stringify(editData));
    return this.http.post<User>(`http://localhost:8765/authorization-service/authentication/edit-user`, fd, {
      headers:{'Authorization': jwt}
    });
  }
  
  public getUserObject(jwt :any): Observable<any> {
    let fname = this.localStorageService.getUserData();
    return this.http.get<User>(`http://localhost:8765/authorization-service/authentication/get-user/${fname}`, {
      headers:{'Authorization': jwt}
    });
  }

}