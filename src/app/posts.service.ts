import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './posts';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

    private postsUrl = 'https://my-json-server.typicode.com/typicode/demo/posts';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

     /** GET posts from the server */
     getPosts(): Observable<Post[]> {
      return this.http.get<Post[]>(this.postsUrl)
        .pipe(
          tap(_ => this.log('fetched posts')),
          catchError(this.handleError<Post[]>('getPosts', []))
        );
    }

      // Log a PostService message with the MessageService
  private log(message: string) {
    this.messageService.add(`PostService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      //TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      //TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
