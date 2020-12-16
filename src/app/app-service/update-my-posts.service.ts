import { Injectable } from '@angular/core';
import { Post } from '../app-model/post.model';
import {HttpClient} from "@angular/common/http";
import {Subject} from 'rxjs';
import{ map } from "rxjs/operators";
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UpdateMyPostsService {

  private myPosts:Post[] = [];
  private myPostsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient,
              private router: Router) { }

  getMyPostsUpdatedListener(){
    return this.myPostsUpdated.asObservable();
  }

  //get all posts from DB
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

  //add a post to DB
  addPost(newPost: Post){
    this.http.post<{message: string, postId: string}>("http://localhost:3000/api/my-posts", newPost)
    .subscribe((resData) => {
      //newPost.id = resData.postId;
      //this.myPosts.push(newPost);
      //this.myPostsUpdated.next([...this.myPosts]);
      console.log(resData.message);
      this.router.navigate(['/my-posts']);
    });
  }

  //find post by id in local storage
  findPostLocal(id:string){
     return {...this.myPosts.find(post => post.id === id)};
  }

  //find post by id in DB
  findPostDB(id:string){
    return this.http.get<{_id:string, title:string, subtitle:string, content:string}>("http://localhost:3000/api/my-posts/"+id)
  }

  //edit post by id in DB
  editPost(postEdit:Post, id:string){
    postEdit.id = id;
    this.http.patch<{message: string}>("http://localhost:3000/api/my-posts/"+id, postEdit)
    .subscribe((resData)=> {
      console.log(resData.message);
      this.router.navigate(['/my-posts']);
    });
  }

  //delete post by id in DB
  deletePost(id: string){
    this.http.delete<{message: string}>("http://localhost:3000/api/my-posts/"+id)
      .subscribe((resData)=>{
        console.log(resData.message);
        this.myPosts = this.myPosts.filter(post => post.id != id);
        this.myPostsUpdated.next([...this.myPosts]);
      });
  }
}
