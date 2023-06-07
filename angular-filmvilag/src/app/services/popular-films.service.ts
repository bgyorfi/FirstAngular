import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Films, Result } from "../models/film";
import { environment } from '../environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PopularFilms {
  constructor(private http: HttpClient) { }

  private url = environment.apiUrl + 'movie/popular';

  /**
   * Az aktuálisan népszerű filmeket lekéri.
   * @param pageindex Az oldalszám.
   * @returns Az aktuálisan népszerű filmeket tartalmazó Observable objektum.
   */
  getPopularFilms(pageindex: string): Observable<Films> {

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let params = new HttpParams();
    params = params.append('page', pageindex);

    // A teljes válasz helyett csak a films.results tömböt adjuk vissza
    const array: Observable<Result[]> = this.http.get<Films>(environment.apiUrl, { headers }).pipe(
      map(response => response.results)
    );

    return this.http.get<Films>(this.url, { headers, params }).pipe();
  }
}
