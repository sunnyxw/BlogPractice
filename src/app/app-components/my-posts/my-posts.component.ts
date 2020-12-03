import { Component, OnInit } from '@angular/core';
import { UpdateMyPostsService } from 'src/app/app-service/update-my-posts.service';
import{ Post } from '../../app-model/post.model';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  myPosts:Post[];
  private myPostsSub: Subscription;

  constructor(public updateMyPostsService:UpdateMyPostsService) {
  }


  ngOnInit(): void {
    this.updateMyPostsService.getPosts();
    this.myPostsSub = this.updateMyPostsService.getMyPostsUpdatedListener()
      .subscribe((posts: Post[])=>{
        this.myPosts = posts;
      });
  }

  onDelete(postId:string){
    this.updateMyPostsService.deletePost(postId);
  }

  ngOnDestroy(){
    this.myPostsSub.unsubscribe();
  }

}
