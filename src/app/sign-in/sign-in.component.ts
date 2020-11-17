import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ElementFinder } from 'protractor';
import {SignInData} from './sign-in-data.model';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SignInComponent>,
    @Inject(MAT_DIALOG_DATA) public signInData: SignInData) {}

  ngOnInit(): void {}

  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    else if(this.email.hasError('email')){
      return 'Not a valid email';
    }
  }

  getErrorMessageName() {
      return 'You must enter a name';
  }

  onNoClick(): void {
      this.dialogRef.close();
  }

  /*onYesClick(){
    if(this.email.hasError('required'||'email') || this.name.hasError('required')){
      this.getErrorMessageEmail();
      this.getErrorMessageName();
    }
  }*/
}
