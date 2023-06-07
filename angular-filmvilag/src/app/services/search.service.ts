import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Result, Films } from '../models/film';
import { TvShow, TvShowsResponse } from '../models/show';
import { map } from 'rxjs/operators';
import { Actors } from '../models/actor';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Filmek keresése az adott paraméter alapján.
   * @param pageindex Az oldalszám.
   * @param param A keresési paraméter.
   * @returns A találatokat tartalmazó Observable objektum.
   */
  getMoviesBySearch(pageindex: string = '0', param: string): Observable<Films> {

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let queryUrl = this.url + 'search/movie';
    let params = new HttpParams();
    params = params.append('query', param);
    params = params.append('page', pageindex);

    return this.http.get<Films>(queryUrl, { headers, params }).pipe();
  }

  /**
   * TV műsorok keresése az adott paraméter alapján.
   * @param pageindex Az oldalszám.
   * @param param A keresési paraméter.
   * @returns A találatokat tartalmazó Observable objektum.
   */
  getShowBySearch(pageindex: string = '0', param: string): Observable<TvShowsResponse> {

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let queryUrl = this.url + 'search/tv';
    let params = new HttpParams();
    params = params.append('query', param);
    params = params.append('page', pageindex);

    return this.http.get<TvShowsResponse>(queryUrl, { headers, params }).pipe();
  }

  /**
   * Színészek keresése az adott paraméter alapján.
   * @param pageindex Az oldalszám.
   * @param param A keresési paraméter.
   * @returns A találatokat tartalmazó Observable objektum.
   */
  getActorBySearch(pageindex: string = '0', param: string): Observable<Actors> {

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let queryUrl = this.url + 'search/person';
    let params = new HttpParams();
    params = params.append('query', param);
    params = params.append('page', pageindex);

    return this.http.get<Actors>(queryUrl, { headers, params }).pipe();
  }
}
