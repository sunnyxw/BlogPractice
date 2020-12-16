import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators, FormBuilder} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import {AuthData} from 'src/app/app-model/auth-data.model';
import {AuthenticationService} from 'src/app/app-service/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public authChoice:string = "signIn";
  public showPwd:boolean = false;
  public authErrMsg:boolean = false;

  constructor(
    public dialogRef: MatDialogRef<SignInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthData,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
    ) {dialogRef.disableClose = true;}

  ngOnInit(): void {
  }

  profileForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(10)]],
    password: ['', Validators.required],
    email: ['default:signInEmail', Validators.required]
  });

  getErrorMessageEmail() {
    if (this.profileForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    else if(this.profileForm.get('email').hasError('email')){
      return 'Not a valid email';
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

  onSignIn(){
    //todo: set authErrMsg=false;
    this.authService.signIn(this.profileForm.value.name, this.profileForm.value.password)
      .subscribe(result=>{
          this.authService.updateToken(result.token);
          this.authService.updateAuthStatus(true);

          const expiresInDuration = result.expiresIn;
          this.authService.setAuthTimer(expiresInDuration);

          const now = new Date();
          const expirationDate = new Date(now.getTime()+ expiresInDuration*1000);
          this.authService.saveAuthData(result.token, expirationDate, this.profileForm.value.name);

          this.dialogRef.close(this.profileForm);
          //todo: handle res.status err, set authErrMsg.
        }
      );
  }

  onSignUp(){
    //todo: set authErrMsg=false;
    this.authService.signUp(this.profileForm.value.name, this.profileForm.value.password, this.profileForm.value.email)
      .subscribe(result =>{
        this.authService.updateToken(result.token);
        this.authService.updateAuthStatus(true);

        const expiresInDuration = result.expiresIn;
        this.authService.setAuthTimer(expiresInDuration);

        const now = new Date();
        const expirationDate = new Date(now.getTime()+ expiresInDuration*1000);
        this.authService.saveAuthData(result.token, expirationDate, this.profileForm.value.name);

        this.dialogRef.close(this.profileForm);
        //todo: handle res.status err, set authErrMsg.
      });
  }

  onClickSignUp(){
    this.profileForm.patchValue({email: ""});
    this.authChoice = "signUp";
  }

  onClickSignIn(){
    this.profileForm.patchValue({email:"default:signInEmail"});
    this.authChoice = "signIn";
  }

}
