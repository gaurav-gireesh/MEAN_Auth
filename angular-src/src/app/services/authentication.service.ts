import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import "rxjs/add/operator/map";


@Injectable()
export class AuthenticationService {
  register_url: any = "http://localhost:3000/users/register";

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

}
