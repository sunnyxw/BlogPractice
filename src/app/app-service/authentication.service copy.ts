import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthData} from 'src/app/app-model/auth-data.model';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token:string;
  private authStatus:boolean=false;
  private authStatusListener = new Subject<boolean>();
  public tokenTimer:any;
  public displayName: string = "";

  constructor(private http: HttpClient, private router: Router) { }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  getAuthStatus(){ return this.authStatus;}

  updateAuthStatus(authStatus: boolean){
    this.authStatus = authStatus;
    this.authStatusListener.next(this.authStatus);
  }

  updateToken(token: string){ this.token = token;}
  getToken(){ return this.token;}

  saveAuthData(token: string, expirationDate: Date, display: string){
    localStorage.setItem("token", token);
    localStorage.setItem("expirationDate", expirationDate.toISOString());
    localStorage.setItem("display", display);
  }

  clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("display");
  }

  autoAuthUser(){
    const token = localStorage.getItem("token");
    if(!token){ return }
    else{ this.token = token; }
  }

  setAuthTimer(expiresInDuration: number){
    console.log("setting time"+ expiresInDuration);
    this.tokenTimer = setTimeout(()=>{
    this.updateAuthStatus(false);
    this.router.navigate(['/']);
    }, expiresInDuration*1000); //setTimeout works with miliseconds
  }

  signIn(name:string, password: string){
    const signInData: AuthData = {name: name, password:password, email: null};
    return this.http.post<{token:string, expiresIn: number}>("http://localhost:3000/api/user/sign-in", signInData)
  }

  signUp(name:string, password:string, email:string){
    const signUpData: AuthData = {name: name, password: password, email: email};
    return this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/user/sign-up", signUpData)
  }
}
