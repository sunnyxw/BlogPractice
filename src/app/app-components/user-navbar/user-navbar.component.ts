import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../app-service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogOut(){
    this.authService.updateAuthStatus(false);
    this.authService.clearAuthData();
    clearTimeout(this.authService.tokenTimer);
    this.router.navigate(['/']);
  }
}
