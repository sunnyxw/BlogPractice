import { Injectable } from '@angular/core';
import { Post } from '../app-model/post.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateMyPostsService {

  constructor() { }

  private posts:Post[] = [];

  getPosts(){
    return [...this.posts];
  }

  addPost(title:string, subtitle:string, content:string){
    const post: Post={title:title, subtitle:subtitle, content:content};
    this.posts.push(post);
  }



}
