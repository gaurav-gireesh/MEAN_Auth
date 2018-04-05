import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from  'angular2-flash-messages';
import {AuthenticationService} from '../../services/authentication.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username:String;
  password:String;
  constructor(private flashService:FlashMessagesService,private authService:AuthenticationService,private router:Router) { }

  ngOnInit() {
  }


  onSubmitLogin()
  {
    let user={username:this.username,password:this.password};
    console.log(user);
    this.authService.authenticate(user).subscribe(data=>
    {
      if(data.success)
      {
          this.authService.storeUserDetails(data.user,data.token);
          this.flashService.show("You are now logged in!",{cssClass:'alert-success'});
          this.router.navigate(['dashboard']);

      }
      else{
        this.flashService.show(data.msg,{cssClass:'alert-danger'});
        this.router.navigate(['login']);
      }
    });

    
  }
}
