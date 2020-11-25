import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

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

import { AppComponent } from './app.component';
import { HeaderComponent } from './app-components/header/header.component';
import { SignInComponent } from './app-components/sign-in/sign-in.component';
import { PostListComponent } from './app-components/post-list/post-list.component';
import { SideNavComponent } from './app-components/side-nav/side-nav.component';
import { UserNavbarComponent } from './app-components/user-navbar/user-navbar.component';
import { WriteNewPostComponent } from './app-components/write-new-post/write-new-post.component';
import { PageNotFoundComponent } from './app-components/page-not-found/page-not-found.component';
import { MyPostsComponent } from './app-components/my-posts/my-posts.component';

import { UpdateMyPostsService } from './app-service/update-my-posts.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignInComponent,
    PostListComponent,
    SideNavComponent,
    UserNavbarComponent,
    WriteNewPostComponent,
    PageNotFoundComponent,
    MyPostsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'home', component: PostListComponent},
      {path: 'write-new-post', component: WriteNewPostComponent},
      {path:'my-posts', component: MyPostsComponent},
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent},
    ]),
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
  entryComponents: [
    SignInComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
