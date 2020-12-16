import { Component, OnDestroy, OnInit } from '@angular/core';
import { UpdateMyPostsService } from 'src/app/app-service/update-my-posts.service';
import{ Post } from '../../app-model/post.model';
import { Subscription} from 'rxjs';
import { AuthenticationService} from '../../app-service/authentication.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit, OnDestroy {
  myPosts:Post[];
  private myPostsSub: Subscription;
  public authStatus:boolean = false;
  public authStatusSub: Subscription;

  constructor(public updateMyPostsService:UpdateMyPostsService,
    public authService: AuthenticationService) {
  }


  ngOnInit(): void {
    this.updateMyPostsService.getPosts();
    this.authStatus = this.authService.getAuthStatus();
    this.myPostsSub = this.updateMyPostsService.getMyPostsUpdatedListener()
      .subscribe((posts: Post[])=>{
        this.myPosts = posts;
      });
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe((result: boolean)=>{
      this.authStatus = result;
    });
  }

  onDelete(postId:string){
    this.updateMyPostsService.deletePost(postId);
  }

  ngOnDestroy(){
    this.myPostsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
