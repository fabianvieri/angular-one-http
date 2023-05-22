import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, Post } from './post.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  endPointUrl =
    'https://web-api-952c7-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postUrl = this.endPointUrl + 'post.json';

  constructor(private http: HttpClient) {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http.post(this.postUrl, postData).subscribe((data) => {
      console.log('data', data);
    });
  }

  deletePosts() {
    return this.http.delete(this.postUrl);
  }

  updatePost(post: { [x: string]: { title: string; content: string } }) {
    return this.http.patch(this.postUrl, post);
  }

  fetchPosts() {
    return this.http.get<Data>(this.postUrl).pipe(
      map((response) => {
        // console.table(response);
        const array = [];
        for (const key in response) {
          // console.log(key);
          if (response.hasOwnProperty(key)) {
            array.push({ ...response[key], id: key });
          }
        }

        return array;
      })
    );
  }
}
