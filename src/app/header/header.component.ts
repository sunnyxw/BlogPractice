import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import{ SignInData} from '../sign-in/sign-in-data.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  signInData:SignInData={name:"", email:""};
  displayUserName = ""

  openDialog(): void {
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '250px',
      data: this.signInData,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
          this.signInData = result;
          console.log(result)
          this.displayUserName = this.signInData.name;
      }
      else{
        this.displayUserName = "Guest";
      }
    });
  }

}
