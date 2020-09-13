import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Profession } from './profession';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  private professionsUrl = 'api/professions';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient, private messageService: MessageService){ }


  /** GET professions from the server */
  getProfessions(): Observable<Profession[]> {
    return this.http.get<Profession[]>(this.professionsUrl)
      .pipe(
        tap(_ => this.log('fetched professions')),
        catchError(this.handleError<Profession[]>('getProfessions', []))
      );
  }

  /** GET profession by id. Will 404 if id not found */
  getProfession(id: number): Observable<Profession> {
      const url = `${this.professionsUrl}/${id}`;
      return this.http.get<Profession>(url).pipe(
      tap(_ => this.log(`fetched profession id=${id}`)),
        catchError(this.handleError<Profession>(`getProfession id=${id}`))
      );
  }

  // Log a ProfessionService message with the MessageService
  private log(message: string) {
    this.messageService.add(`ProfessionService: ${message}`);
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
