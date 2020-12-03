import { Injectable } from '@angular/core';
import { Post } from '../app-model/post.model';
import {HttpClient} from "@angular/common/http";
import {Subject} from 'rxjs';
import{ map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UpdateMyPostsService {

  private myPosts:Post[] = [];
  private myPostsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getMyPostsUpdatedListener(){
    return this.myPostsUpdated.asObservable();
  }

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

  addPost(newPost: Post){
    return this.http.post<{message: string, postId: string}>("http://localhost:3000/api/my-posts", newPost)
  }

  findPostLocal(id:string){
     return {...this.myPosts.find(post => post.id === id)};
  }

  // thinking about how to write it correctly...
  findPostDB(id:string){
    return this.http.get<{_id:string, title:string, subtitle:string, content:string}>("http://localhost:3000/api/my-posts/"+id)
  }

  editPost(postEdit:Post, id:string){
    postEdit.id = id;
    return this.http.patch<{message: string}>("http://localhost:3000/api/my-posts/"+id, postEdit)
  }

  deletePost(id: string){
    this.http.delete<{message: string}>("http://localhost:3000/api/my-posts/"+id)
      .subscribe((resData)=>{
        console.log(resData.message);
        this.myPosts = this.myPosts.filter(post => post.id != id);
        this.myPostsUpdated.next([...this.myPosts]);
      });
  }
}
