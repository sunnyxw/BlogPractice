import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators, FormBuilder} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SignInData} from '../../app-model/sign-in-data.model';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SignInComponent>,
    @Inject(MAT_DIALOG_DATA) public signInData: SignInData,
    private fb: FormBuilder) {dialogRef.disableClose = true;}

  ngOnInit(): void {}

  profileForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  getErrorMessageEmail() {
    if (this.profileForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    else if(this.profileForm.get('email').hasError('email')){
      return 'Not a valid email';
    }
  }

  onNoClick(): void {
      this.dialogRef.close();
  }

}
