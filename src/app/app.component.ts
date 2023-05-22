import { Component } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  endPointUrl =
    'https://web-api-952c7-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postUrl = this.endPointUrl + 'post.json';
  loadedPosts: Post[] = [];
  isLoading = false;

  idUpdate = '';
  titleUpdate = '';
  contentUpdate = '';

  constructor(private postService: PostService) {}

  ngOnInit() {}

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.postService.onCreatePost(postData);
  }

  onViewPost(post: Post) {
    if (post) {
      this.idUpdate = post.id!;
      this.titleUpdate = post.title;
      this.contentUpdate = post.content;
    }
  }

  onUpdatePost() {
    const post = {
      [this.idUpdate]: {
        title: this.titleUpdate,
        content: this.contentUpdate,
      },
    };

    this.postService.updatePost(post).subscribe((data) => {
      console.log(data);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.isLoading = true;
    this.postService.fetchPosts().subscribe((posts) => {
      this.isLoading = false;
      this.loadedPosts = posts;
    });
  }

  onClearPosts() {
    // Send Http request
    this.isLoading = true;
    this.postService.deletePosts().subscribe((data) => {
      this.isLoading = false;
      this.loadedPosts = [];
    });
  }

  // private fetchPosts() {
  //   this.isLoading = true;
  //   this.postService.fetchPosts().subscribe((posts) => {
  //     console.log(posts);
  //     this.isLoading = false;
  //     this.loadedPosts = posts;
  //   });
  // }
}
