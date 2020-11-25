import { Injectable } from '@angular/core';
import { Post } from '../app-model/post.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateMyPostsService {

  constructor() { }

  private myPosts:Post[] = [
    {"title":"Diverse zero tolerance archive",
      "subtitle":"envisioneer leading-edge content",
      "content": "snonowheoiubnasoihnsi, onoihnesjkbsn, noisdnoigjhsoie"
    },

    {"title":"Organic needs-based Graphical User Interface",
      "subtitle":"grow synergistic web-readiness",
      "content": "snonowheoiubnasoihnsi, onoihnesjkbsn, noisdnoigjhsoie"
    }
  ];

  private myPostsUpdated = new Subject<Post[]>();


  getPosts(){
    return [...this.myPosts];
  }

  getMyPostsUpdatedListener(){
    return this.myPostsUpdated.asObservable();
  }


  addPost(title:string, subtitle:string, content:string){
    const post: Post={title:title, subtitle:subtitle, content:content};
    this.myPosts.push(post);
    this.myPostsUpdated.next([...this.myPosts]);
  }



}
