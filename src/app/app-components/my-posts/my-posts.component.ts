import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    myPosts = [
      {"title":"Diverse zero tolerance archive",
      "subtitle":"envisioneer leading-edge content",
      "content": "snonowheoiubnasoihnsi, onoihnesjkbsn, noisdnoigjhsoie"
      },

      {"title":"Organic needs-based Graphical User Interface",
      "subtitle":"grow synergistic web-readiness",
      "content": "snonowheoiubnasoihnsi, onoihnesjkbsn, noisdnoigjhsoie"
    }
    ]


}
