import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-write-new-post',
  templateUrl: './write-new-post.component.html',
  styleUrls: ['./write-new-post.component.css']
})
export class WriteNewPostComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  profileForm = this.fb.group({
    title: ['', Validators.required],
    subtitle: [''],
    content: ['', [Validators.required]],
  });

  submitNewPost(){
    console.log(this.profileForm)
  }
}
