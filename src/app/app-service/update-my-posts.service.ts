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
    this.http.post<{ message: string; postId: string}>("http://localhost:3000/api/my-posts", newPost)
      .subscribe((resData) => {
        console.log(resData.message);
       // post.id = resData.postId;
        //this.myPosts.push(post);
      });
  }

  findPostEdit(id:string){
     return {...this.myPosts.find(post => post.id === id)};
  }

  editPost(postEdit:Post, id:string){
    postEdit.id = id;
    this.http.patch<{message: string}>("http://localhost:3000/api/my-posts/"+id, postEdit)
      .subscribe((resData)=> console.log(resData.message));
  }

  deletePost(postId: string){
    this.http.delete<{message: string}>("http://localhost:3000/api/my-posts/"+postId)
      .subscribe((resData)=>{
        console.log(resData.message);
        this.myPosts = this.myPosts.filter(post => post.id != postId);
        this.myPostsUpdated.next([...this.myPosts]);
      });
  }
}
