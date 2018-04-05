import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import "rxjs/add/operator/map";


@Injectable()
export class AuthenticationService {
  register_url: any = "http://localhost:3000/users/register";
  login_url: any = "http://localhost:3000/users/authenticate";

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
  localStorage.setItem('id_token',token);
  localStorage.setItem('user',user);
  return;
}


logout()
{
  this.token=null;
  this.user=null;
  localStorage.clear();
  return false;
}


}
