import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user:Object;
  constructor(private authService:AuthenticationService,private router:Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data=> {
      console.log("data coming "+data)
      this.user=data.user;
    },
    err=>{
      console.log(err);
      return false;
    }
  )
  }


}
