import { Component, OnInit } from '@angular/core';
import postList from '../../mock-data/mock.postList.json';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  postList = postList;

  constructor() { }

  ngOnInit(): void {
  }

}
