import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../../services/validate.service';
import {FlashMessagesService} from  'angular2-flash-messages';
import {AuthenticationService} from '../../services/authentication.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:String
  username:String
  email:String
  password:String

  constructor(private validateService:ValidateService,private flashService:FlashMessagesService,private authService:AuthenticationService,private router:Router) { }

  ngOnInit() {
  }


  //register submit callback
  onSubmitRegister()
  {
    const user = {
                    name:this.name,
                    email:this.email,
                    username:this.username,
                    password:this.password
              
                };
console.log(user);
      if(!this.validateService.validateRegister(user)){
        console.log("Please fill in required fields");
        this.flashService.show("Please fill in required fields",{cssClass:'alert-danger'});
        return false;
    }

      if(!this.validateService.validateEmail(user.email)){
          console.log("Please fill in valid email id");
          this.flashService.show("Please fill in valid email id",{cssClass:'alert-danger'});
          return false;
    }

    this.authService.registerUser(user).subscribe(data=>
    {

      console.log(data);
      if(data.status)
      {
        this.flashService.show("You have registered! You may login!",{cssClass:'alert-success'});
        this.router.navigate(['/login']);

      }
      else{
        this.flashService.show("Oops something went wrong here...!",{cssClass:'alert-danger'});
        this.router.navigate(['/register']);
      }
    });
  }
}
