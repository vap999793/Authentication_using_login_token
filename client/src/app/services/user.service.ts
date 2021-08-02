import { Injectable } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpClientModule, HttpParams} from '@angular/common/http'
import { User } from '../models/registerModel';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }

  // saveTokenToLocalStorage(token: string) {
  //   localStorage.setItem('token', "Bearer " + token)
  // }

  // getToken() {
  //   return localStorage.getItem('token') ? localStorage.getItem('token') : "";
  // }

  userPost(user:User){
    return this.http.post("http://localhost:3000/users/register", user);
  }

  userLogin(user:login){
    return this.http.post("http://localhost:3000/users/login", user)
    .pipe(
      map((result:any)=>{
        // this.saveTokenToLocalStorage(result.token);
        return result;
      })
    )
  }

  getUsername(){
    return this.http.get("http://localhost:3000/users/username", {
      headers:{
        'Authorization' : "Bearer "+localStorage.getItem('token')
      }
    }).pipe(
      map((result:any)=>{
        console.log(result);
        
        return result;
      })
    )
  }
}

interface login{
  email:String,
  password:String
}

interface loginResponse{
  token:string,
  message:string
}
