import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilmDetails, Credits } from "../models/filmdetails";
import { environment } from '../environment';
import { map } from 'rxjs/operators';
import { Video, Videos } from '../models/videodetails';

@Injectable({
  providedIn: 'root'
})
export class FilmDetailsService {

  constructor(private http: HttpClient) { }

  private url = environment.apiUrl + 'movie/';

  /**
   * Az adott azonosítójú film részleteit lekéri.
   * @param id A film azonosítója.
   * @returns A film részleteit tartalmazó Observable objektum.
   */
  getFilmDetails(id: number): Observable<FilmDetails> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let detailsurl = this.url + `${id}`;
    return this.http.get<FilmDetails>(detailsurl, { headers }).pipe();
  }

  /**
   * Az adott azonosítójú film stáblistáját lekéri.
   * @param id A film azonosítója.
   * @returns A film stáblistáját tartalmazó Observable objektum.
   */
  getFilmCredits(id: number): Observable<Credits> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let creditsurl = this.url + `${id}` + "/credits";
    return this.http.get<Credits>(creditsurl, { headers }).pipe();
  }

  /**
   * Az adott azonosítójú film videóit lekéri.
   * @param id A film azonosítója.
   * @returns A film videóit tartalmazó Observable objektum.
   */
  getFilmVideo(id: number): Observable<Video[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let videosurl = this.url + `${id}` + "/videos";
    return this.http.get<Videos>(videosurl, { headers }).pipe(
      map(response => response.results)
    );
  }
}