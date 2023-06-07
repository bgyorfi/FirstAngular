import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Actors } from '../models/actor';
import { ActorDeteils } from '../models/actor';
import { ResultForActorCredits, Cast } from '../models/actor';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }

  private url = environment.apiUrl + 'person/';

  /**
   * Az aktorok listáját lekéri az adott oldalszámmal együtt.
   * @param pageindex Az oldalszám.
   * @returns Az aktorok listáját tartalmazó Observable objektum.
   */
  getActorList(pageindex: string): Observable<Actors> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let popularUrl = this.url + 'popular';
    let params = new HttpParams();
    params = params.append('page', pageindex);

    return this.http.get<Actors>(popularUrl, { headers, params }).pipe();
  }

  /**
   * Az adott azonosítójú aktor részleteit lekéri.
   * @param id Az aktor azonosítója.
   * @returns Az aktor részleteit tartalmazó Observable objektum.
   */
  getActorById(id: number): Observable<ActorDeteils> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let detailsurl = this.url + `${id}`;

    return this.http.get<ActorDeteils>(detailsurl, { headers }).pipe();
  }

  /**
   * Az adott azonosítójú aktor filmekben és TV műsorokban való szerepléseit lekéri.
   * @param id Az aktor azonosítója.
   * @returns Az aktor szerepléseit tartalmazó Observable objektum.
   */
  getActorCredits(id: number): Observable<Cast[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let creditsurl = this.url + `${id}` + "/combined_credits";

    return this.http.get<ResultForActorCredits>(creditsurl, { headers }).pipe(
      map(response => response.cast)
    );
  }
}