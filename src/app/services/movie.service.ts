import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';


@Injectable({
  providedIn: 'root'
})

export class MovieService {
  // http://www.omdbapi.com/?i=tt3896198&apikey=2045c290
  apiUrl = 'https://www.omdbapi.com/';
  apiKey = '2045c290';
  // apiKey = '2e95829b';
  type = 'movie';

  constructor(
    private http: HttpClient,

  ) {
  }

  getPosts$(title: string): Observable<Post[]> {
    const findingPosts = `${this.apiUrl}?type=${this.type}&s=${encodeURI(title)}&apikey=${this.apiKey}`;
    // console.log(finding_posts);
    return this.http.get(findingPosts).pipe(map(posts => posts['Search']));
  }
  getPost$(id: string) {
    const findingPosts = `${this.apiUrl}?i=${id}&apikey=${this.apiKey}`;
    // console.log(finding_post);
    return this.http.get<Post>(findingPosts);
  }
}
