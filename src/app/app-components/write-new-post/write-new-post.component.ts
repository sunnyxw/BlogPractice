import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { UpdateMyPostsService } from 'src/app/app-service/update-my-posts.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription} from "rxjs";
import { Post} from "../../app-model/post.model";

@Component({
  selector: 'app-write-new-post',
  templateUrl: './write-new-post.component.html',
  styleUrls: ['./write-new-post.component.css']
})

export class WriteNewPostComponent implements OnInit {

  constructor(private fb: FormBuilder, public updateMyPostsService: UpdateMyPostsService, private router: Router) { }

  ngOnInit(): void {
  }
  private myPostsSub: Subscription;

  profileForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    subtitle: [''],
    content: ['', [Validators.required]],
  });

  submitNewPost(profileForm: FormGroup){
    console.log("new post submited!")
    this.updateMyPostsService.addPost(profileForm.value.title, profileForm.value.subtitle, profileForm.value.content);


    this.myPostsSub = this.updateMyPostsService.getMyPostsUpdatedListener()
    .subscribe((posts: Post[])=>{
      console.log("this is from the write-new-post component:");
      console.log(posts);
    });

    this.router.navigate(['/my-posts']);
  }
}
