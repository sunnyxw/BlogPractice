import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatExpansionModule
],
exports: [
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatExpansionModule
]})
export class AppMaterialModule { }
