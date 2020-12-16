import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import{ AuthData} from '../../app-model/auth-data.model';
import { AuthenticationService} from '../../app-service/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

   // this sidenavToggle input is at "app.component.html", to control sidenav display or not.
  @Output() public sidenavToggle = new EventEmitter();

  public authData:AuthData={name:"", password:"", email: ""};
  public displayUserName: string;
  public authStatus:Boolean=false;
  public authStatusSub: Subscription;

  constructor(public dialog: MatDialog,
              public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.displayUserName = this.authService.displayName;
    this.authStatus = this.authService.getAuthStatus();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe((result:boolean)=>{
        this.authStatus=result;
        if (!result){
          this.displayUserName = ""
        }
        else {
          this.displayUserName = this.authService.displayName;
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '274px',
      data: this.authData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
              this.displayUserName = result.value.name;
              this.authStatus=true;
              console.log('signup/signin success in front!');
      } else {
        console.log("signin/signup cancelled!");
      }
    });

  }

  //toggle display the sidemenu or not based by clicking the upperleft button.
  public onToggleSidenav = ()=>{
    this.sidenavToggle.emit();
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
