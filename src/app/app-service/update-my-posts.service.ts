import { Injectable } from '@angular/core';
import { Post } from '../app-model/post.model';
import {HttpClient} from "@angular/common/http";
import {Subject} from 'rxjs';
import{ map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UpdateMyPostsService {

  constructor(private http: HttpClient) { }

  private myPosts:Post[] = [];

  private myPostsUpdated = new Subject<Post[]>();


  getPosts(){
    this.http.get<{message: string, myPosts: any}>("http://localhost:3000/api/my-posts")
      .pipe(map((myPostsData)=>{
        return myPostsData.myPosts.map(post=>{
          return {
            title: post.title,
            subtitle: post.subtitle,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((myPostsRemapped)=>{
        this.myPosts = myPostsRemapped;
        this.myPostsUpdated.next([...this.myPosts]);
      });
  }

  getMyPostsUpdatedListener(){
    return this.myPostsUpdated.asObservable();
  }


addPost(title:string, subtitle:string, content:string){
    const post: Post={id: null, title:title, subtitle:subtitle, content:content};
    this.http.post<{ message: string; postId: string}>("http://localhost:3000/api/my-posts", post)
      .subscribe((resData) => {
        console.log(resData.message);
       // post.id = resData.postId;
        //this.myPosts.push(post);
      });
  }

  deletePost(postId: string){
    this.myPosts = this.myPosts.filter(post => post.id != postId);
    this.myPostsUpdated.next([...this.myPosts]);
    this.http.delete<{message: string}>("http://localhost:3000/api/my-posts/"+postId)
      .subscribe((resData)=>{
        console.log(resData.message);
      });
  }
}
