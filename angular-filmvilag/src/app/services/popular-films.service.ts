import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokedex, Result} from "../models/popularfilm"
import { environment } from '../environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PopularFilms {
  constructor(private http: HttpClient) { }

  private url = environment.apiUrl + 'movie/popular';

  getPopularFilms(pageindex: string): Observable<Result[]>{

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let params = new HttpParams();
    params = params.append('page', pageindex);

    const array : Observable<Result[]> = this.http.get<Pokedex>(environment.apiUrl, { headers }).pipe(
      map(response => response.results)
    );

    return this.http.get<Pokedex>(this.url, { headers, params }).pipe(
      map(response => response.results),
      tap(films => {
        films.forEach(film => {
          console.log(film.title);
        });
      })
    );
}
}