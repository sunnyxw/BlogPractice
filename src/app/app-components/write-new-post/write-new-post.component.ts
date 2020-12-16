import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { UpdateMyPostsService } from 'src/app/app-service/update-my-posts.service';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Post } from 'src/app/app-model/post.model';

@Component({
  selector: 'app-write-new-post',
  templateUrl: './write-new-post.component.html',
  styleUrls: ['./write-new-post.component.css']
})

export class WriteNewPostComponent implements OnInit {

  public postEdit:Post;
  private mode:string = "create";

  constructor(private fb: FormBuilder,
              public updateMyPostsService: UpdateMyPostsService,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = "edit";
        const id = paramMap.get('postId')
        const postLocal = this.updateMyPostsService.findPostLocal(id);
        if (postLocal.id){
          this.postEdit = postLocal;
          this.populatePost(this.postEdit);
        }
        else{
          this.updateMyPostsService.findPostDB(id)
            .subscribe(resData =>{
              this.postEdit={
                id: resData._id,
                title:resData.title,
                subtitle:resData.subtitle,
                content:resData.content
              }
              this.populatePost(this.postEdit);
            })
        }
      }
      else{ this.mode = "create"; }
    })
  }

  myPostForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    subtitle: [''],
    content: ['', Validators.required]
  });

  populatePost(postEdit: Post){
    this.myPostForm.setValue({
      title: postEdit.title,
      subtitle: postEdit.subtitle,
      content: postEdit.content
    })
  }

  onSavePost(){
    if(this.mode === "create"){
        console.log("new post submitted!");
        this.updateMyPostsService.addPost(this.myPostForm.value);
    }
    else{
      console.log("edit post submitted!");
      this.updateMyPostsService.editPost(this.myPostForm.value, this.postEdit.id);
    }
  }
}
