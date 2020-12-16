import { OnInit, Component } from '@angular/core';
import { AuthenticationService } from './app-service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthenticationService){}

  ngOnInit(){
    this.authService.autoAuthUser();
  }


}
