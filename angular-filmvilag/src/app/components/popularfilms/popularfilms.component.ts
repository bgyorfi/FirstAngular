import { Component, OnInit } from '@angular/core';
import { PopularFilms } from 'src/app/services/popular-films.service';
import { Result } from 'src/app/models/film';
import { environment } from 'src/app/environment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { FilmDetailsService } from 'src/app/services/film-details.service';
import { Router } from '@angular/router';
import { SearchService} from 'src/app/services/search.service';

@Component({
  selector: 'app-popular-films',
  templateUrl: './popularfilms.component.html',
  styleUrls: ['./popularfilms.component.css']
})
export class PopularFilmsComponent implements OnInit {

  films: Result[] = [];
  pageIndex = "1";
  pageSize = 0;
  totalvalue = 0;
  searchKeyword: string = "";


  constructor(
    private popularFilmsService: PopularFilms,
    private filmDetailsService: FilmDetailsService,
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    console.info('PopularFilmsComponent OnInit.');
    this.getPopularFilms();
  }

  paginatorChanged(event : any){
    this.pageIndex = event.pageIndex + 1;
    if(this.searchKeyword.length === 0)
      this.getPopularFilms();
    else
      this.getFilmsByParam(true);
  }

  getPopularFilms(): void {
    
    this.films = [];
    this.popularFilmsService.getPopularFilms(this.pageIndex)
      .subscribe(films => {
        this.films = films.results;
        this.totalvalue = films.total_results
        this.pageSize = films.results.length
      });
  }

  getFilmsByParam(paging: boolean = false){
    if (!paging) this.pageIndex = '1'
    this.films = [];
    this.searchService.getMoviesBySearch(this.pageIndex, this.searchKeyword)
    .subscribe(films => {
      this.films = films.results;
      this.totalvalue = films.total_results
      
    });
  }

  getPosterUrl(posterPath: string): string {
    console.log(posterPath)
    return environment.imagePath + posterPath;
  }

  viewFilmDetails(filmId: number): void {
    this.filmDetailsService.getFilmDetails(filmId).subscribe((details) => {
      // Átirányítás a részletező nézetre, ahol megjelennek a film adatai és szereplői
      this.router.navigate(['/film-details', filmId], { state: { details } });
    });
  }
}
