import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { WriteNewPostComponent } from './app-components/write-new-post/write-new-post.component';
import { PageNotFoundComponent } from './app-components/page-not-found/page-not-found.component';
import { MyPostsComponent } from './app-components/my-posts/my-posts.component';
import { PostListComponent } from './app-components/post-list/post-list.component';

const AppRoutes: Routes=[
  {path: 'home', component: PostListComponent},
  {path: 'write-new-post', component: WriteNewPostComponent},
  {path: 'edit/:postId', component: WriteNewPostComponent},
  {path:'my-posts',component: MyPostsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports:[RouterModule.forRoot(AppRoutes)],
  exports:[RouterModule]
})

export class AppRoutingModule{};
