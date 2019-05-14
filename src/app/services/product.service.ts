import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { environment as config } from './../../environments/environment'
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  constructor(private http: HttpClient) { }


  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${config.apiUri}/${config.apiProd}`)
      .pipe(
        catchError(this.handleError<Product[]>('fetchProducts', []))
      );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
