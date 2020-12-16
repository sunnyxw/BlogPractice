import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AuthGuard} from "./app-service/auth.guard";
import { WriteNewPostComponent } from './app-components/write-new-post/write-new-post.component';
import { PageNotFoundComponent } from './app-components/page-not-found/page-not-found.component';
import { MyPostsComponent } from './app-components/my-posts/my-posts.component';
import { PostListComponent } from './app-components/post-list/post-list.component';

const AppRoutes: Routes=[
  {path: 'home', component: PostListComponent},
  {path: 'write-new-post', component: WriteNewPostComponent, canActivate:[AuthGuard]},
  {path: 'edit/:postId', component: WriteNewPostComponent, canActivate:[AuthGuard]},
  {path:'my-posts',component: MyPostsComponent}, //todo: add AuthGuard
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports:[RouterModule.forRoot(AppRoutes)],
  exports:[RouterModule],
  providers:[AuthGuard]
})

export class AppRoutingModule{};
