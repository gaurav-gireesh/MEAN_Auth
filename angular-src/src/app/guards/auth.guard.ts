import {Router,CanActivate } from '@angular/router';
import {Injectable } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private router:Router,private authService:AuthenticationService){}

    canActivate()
    {
                if(this.authService.isLoggedIn())
                {
                    return true;
                }
                else{
                    this.router.navigate(['/']);
                    return false;
                }
    }
}