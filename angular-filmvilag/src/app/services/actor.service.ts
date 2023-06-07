import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Actors } from '../models/actor';
import { ActorDeteils } from '../models/actor';
import { ResultForActorCredits, Cast } from '../models/actor';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }

  private url = environment.apiUrl + 'person/';

  

  getActorList(pageindex: string): Observable<Actors>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let popularUrl = this.url + 'popular'
    let params = new HttpParams();
    params = params.append('page', pageindex);

    return this.http.get<Actors>(popularUrl, { headers, params }).pipe();
  }

  getActorById(id: number): Observable<ActorDeteils>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let detailsurl = this.url + `${id}`

    return this.http.get<ActorDeteils>(detailsurl, {headers}).pipe();
  }

  getActorCredits(id: number): Observable<Cast[]>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let creditsurl = this.url + `${id}` + "/combined_credits"

    return this.http.get<ResultForActorCredits>(creditsurl, { headers}).pipe(
      map(response => response.cast)
    ); 

  }


}
