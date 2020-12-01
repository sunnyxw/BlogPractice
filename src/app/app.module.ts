import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule} from './app-material-module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './app-components/header/header.component';
import { SignInComponent } from './app-components/sign-in/sign-in.component';
import { PostListComponent } from './app-components/post-list/post-list.component';
import { SideNavComponent } from './app-components/side-nav/side-nav.component';
import { UserNavbarComponent } from './app-components/user-navbar/user-navbar.component';
import { WriteNewPostComponent } from './app-components/write-new-post/write-new-post.component';
import { PageNotFoundComponent } from './app-components/page-not-found/page-not-found.component';
import { MyPostsComponent } from './app-components/my-posts/my-posts.component';


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
    AppRoutingModule,
    HttpClientModule,
    AppMaterialModule,
  ],
  entryComponents: [
    SignInComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
