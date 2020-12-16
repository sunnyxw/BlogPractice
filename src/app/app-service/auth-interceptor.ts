import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable} from "@angular/core";
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(public authService: AuthenticationService){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      //need clone because otherwise cause unexpected error
      //headers.set => set or add only this header.
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
