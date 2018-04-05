import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class AuthenticationService {
  register_url: any = "http://localhost:3000/users/register";
  login_url: any = "http://localhost:3000/users/authenticate";
  profile_url:any = "http://localhost:3000/users/profile";
  token:any;
  user:any;

  constructor(private http:Http) { }

  registerUser(user)
  {
    console.log("Hello register i auth");
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post(this.register_url,user,{headers:headers}).map(data=> data.json());
  }

  authenticate(user)
  {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.login_url,user,{headers:headers}).map(data=> data.json());
  }
storeUserDetails(user,token)
{
  this.user=user;
  this.token=token;
  localStorage.setItem('token',token);
  localStorage.setItem('user',JSON.stringify(user));
  return;
}


getProfile()
{
      this.loadToken();
      let headers = new Headers();
         headers.append('Content-Type','application/json');
        headers.append('Authorization',this.token);
       
        return this.http.get(this.profile_url,{headers:headers}).map(data=> data.json());

}

loadToken()
{
  this.token  = localStorage.getItem('token');
  this.user=localStorage.getItem('user');
  
}

logout()
{
  this.token=null;
  this.user=null;
  localStorage.clear();
  return false;
}


//check is logged in
isLoggedIn()
{
  console.log("In is logged In the token is ");
  console.log(this.token);
  return tokenNotExpired('token');
}

}
