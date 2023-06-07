import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { map, tap } from 'rxjs/operators';
import { TvShowsResponse, ShowDetail, ShowCreditResponse} from '../models/show';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private http: HttpClient) { }

  private url = environment.apiUrl + 'tv';

  getPopularTvShwows(pageindex: string): Observable<TvShowsResponse>{

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let params = new HttpParams();
    params = params.append('page', pageindex);
    let popularUrl = this.url + "/popular"
    return this.http.get<TvShowsResponse>(popularUrl, { headers, params }).pipe();
  }

  getShowDetailsById(id: number): Observable<ShowDetail>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let detailsurl = this.url + `/${id}`;

    return this.http.get<ShowDetail>(detailsurl, { headers }).pipe();

  }

  getShowCredits(id: number): Observable<ShowCreditResponse>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.autToken}`
    });

    let creditsurl = this.url + `/${id}` + "/credits"
    
    return this.http.get<ShowCreditResponse>(creditsurl, { headers}).pipe(); 
  }

}
