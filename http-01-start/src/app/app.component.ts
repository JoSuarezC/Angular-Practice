import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error: string = '';
  errorSub: Subscription = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.errorSub = this.postService.error
    .subscribe(errorMessage => {
      this.error = errorMessage
    });
    this.fetchPosts();
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post): void {
    this.postService.createPost(postData);
  }

  onFetchPosts(): void {
    this.fetchPosts();
  }

  private fetchPosts(): void {
    this.isFetching = true;
    this.postService.fetchPosts()
    .subscribe(
      posts => {
        console.log(posts);
        this.loadedPosts = posts;
        this.isFetching = false;
      }
    , error => {
      console.log(error);
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onClearPosts(): void {
    this.postService.deletePosts().subscribe(
      () => {
        this.loadedPosts = [];
      }
    );
  }

  onHandleError(): void {
    this.error = '';
  }
  
}