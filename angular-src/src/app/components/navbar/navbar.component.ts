import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from  'angular2-flash-messages';
import {AuthenticationService} from '../../services/authentication.service';
import {Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private flashService:FlashMessagesService,private authService:AuthenticationService,private router:Router) 

  { }

  ngOnInit() {
  }
  logout()
  {
    this.authService.logout();
    this.flashService.show("You have successfully logged out!",{cssClass:'alert-success',timeout:3000});
    this.router.navigate(['/']);
  }

}
