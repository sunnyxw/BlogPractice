import { TestBed } from '@angular/core/testing';

import { UpdateMyPostsService } from './update-my-posts.service';

describe('UpdateMyPostsService', () => {
  let service: UpdateMyPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateMyPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
