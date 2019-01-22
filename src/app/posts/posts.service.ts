import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  getPosts() {
    // return [...this.posts];
    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe(response => {
        this.posts = response.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  addPost(post: Post) {
    const currentPost: Post = {
      title: post.title,
      content: post.content
    };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe(response => {
        console.log(response.message);
        this.posts.push(currentPost);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
