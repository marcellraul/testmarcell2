import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entries } from '../models/entries';

@Injectable({
  providedIn: 'root',
})
export class EntriesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  readonly URL_API = 'http://localhost:3000/entries';
  private entries: Array<Entries> = [];
  public entries$ = new BehaviorSubject(this.entries);
  private entrie: Entries = new Entries();
  public entrie$ = new BehaviorSubject(this.entrie);

  constructor(private http: HttpClient) {
    this.entries$.subscribe(console.log);
  }

  setEntrie(value) {
    this.entrie$ = value;
    this.entrie$.next(this.entrie);
  }

  setEntries(value) {
    if (Array.isArray(value)) this.entries = value;
    else this.entries.push(value);
    this.entries$.next(this.entries);
  }

  SaveEntrie(entrie: Entries): Observable<any> {
    return this.http.post<any>(this.URL_API, entrie, this.httpOptions).pipe(
      tap((entrie) => this.setEntries(entrie.entry)),
      catchError(this.handleError<Entries>('Add entrie'))
    );
  }

  getListEnties(): Observable<Entries[]> {
    return this.http.get<Entries[]>(this.URL_API).pipe(
      tap((entries) => this.setEntries(entries)),
      catchError(this.handleError<Entries[]>('Get Entries', []))
    );
  }

  getEntrie(id): Observable<Entries> {
    return this.http.get<Entries>(this.URL_API + '/' + id).pipe(
      tap((entrie) => this.setEntries(entrie)),
      catchError(this.handleError<Entries>(`Entrie  id=${id}`))
    );
  }

  updateProduct(id, entrie: Entries): Observable<any> {
    return this.http
      .put(this.URL_API + '/' + id, entrie, this.httpOptions)
      .pipe(
        tap((_) => this.getListEnties().subscribe()),
        catchError(this.handleError<Entries[]>('Update entrie'))
      );
  }

  deleteEntrie(id): Observable<Entries[]> {
    return this.http
      .delete<Entries[]>(this.URL_API + '/' + id, this.httpOptions)
      .pipe(
        tap((_) => {
          const index = this.entries.map((p) => p._id).indexOf(id);
          this.entries.splice(index, 1);
          this.setEntries(this.entries);
        }),
        catchError(this.handleError<Entries[]>('Delete entrie'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
