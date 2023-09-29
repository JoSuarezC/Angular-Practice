import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsEndpoint: string = "https://http-test-f71d9-default-rtdb.firebaseio.com/post.json";
  error: Subject<string> = new Subject();

  constructor(private http: HttpClient) { }

  createPost(postData: Post): void {
    this.http
    .post<{name: string}>(this.postsEndpoint, postData, {
      observe: 'response'
    })
    .subscribe(
      response => {
        console.log("Observe response", response);
      },
      error => {
        this.error.next(error.message);
      }
    );
  }

  fetchPosts(): Observable<Post[]> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom-key', 'value');
    return this.http
    .get<{[key: string]: Post}>(
      this.postsEndpoint, {
        headers: new HttpHeaders({ "Custom-Header": "Hello"}),
        params: searchParams
      })
    .pipe(map(responseData => {
      const postsArray: Post[] = [];
      console.log(responseData);
      for (const key in responseData) {
        responseData.hasOwnProperty(key) &&
        postsArray.push({ ...responseData[key], id: key});
      }

      return postsArray;
    }),
    catchError(errorRes => {
      // Send to analytics server
      return throwError(errorRes);
    })
    );
  }

  deletePosts(): Observable<any> {
    return this.http.delete(this.postsEndpoint, {
      observe: 'events'
    })
    .pipe(tap(event => {
      console.log(event);
      event.type === HttpEventType.Sent && console.log("Sent");
      event.type === HttpEventType.Response && console.log("Body", event.body);
    }));
  }
}
