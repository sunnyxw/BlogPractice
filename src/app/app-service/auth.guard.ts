import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService} from "./authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean>| Promise<boolean>{

    const authStatus = this.authService.getAuthStatus();
    if(!authStatus){
      this.router.navigate(["/"]);
    }
    else {return true;}
  }
}
