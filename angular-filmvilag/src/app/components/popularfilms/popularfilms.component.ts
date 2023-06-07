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
  films: Result[] = []; // Népszerű filmek
  pageIndex = "1"; // Oldalszám
  pageSize = 0; // Oldalméret
  totalvalue = 0; // Összes elem száma
  searchKeyword: string = ""; // Keresőkulcsszó

  constructor(
    private popularFilmsService: PopularFilms, // Népszerű filmek szolgáltatás
    private filmDetailsService: FilmDetailsService, // Film részletek szolgáltatás
    private router: Router, // Router szolgáltatás
    private searchService: SearchService // Keresés szolgáltatás
  ) { }

  ngOnInit(): void {
    console.info('PopularFilmsComponent OnInit.');
    this.getPopularFilms(); // Népszerű filmek lekérése
  }

  paginatorChanged(event: any) {
    this.pageIndex = event.pageIndex + 1; // Az oldalszám beállítása
    if (this.searchKeyword.length === 0)
      this.getPopularFilms(); // Népszerű filmek lekérése
    else
      this.getFilmsByParam(true); // Filmek lekérése kulcsszóval
  }

  getPopularFilms(): void {
    this.films = [];
    this.popularFilmsService.getPopularFilms(this.pageIndex)
      .subscribe(films => {
        this.films = films.results; // Népszerű filmek beállítása
        this.totalvalue = films.total_results; // Összes elem számának beállítása
        this.pageSize = films.results.length; // Oldalméret beállítása
      });
  }

  getFilmsByParam(paging: boolean = false) {
    if (!paging) this.pageIndex = '1';
    this.films = [];
    this.searchService.getMoviesBySearch(this.pageIndex, this.searchKeyword)
      .subscribe(films => {
        this.films = films.results; // Filmek beállítása kulcsszóval
        this.totalvalue = films.total_results; // Összes elem számának beállítása
      });
  }

  getPosterUrl(posterPath: string): string {
    console.log(posterPath);
    return environment.imagePath + posterPath; // Visszaadjuk a film poszterének elérési útját
  }

  viewFilmDetails(filmId: number): void {
    this.filmDetailsService.getFilmDetails(filmId).subscribe((details) => {
      // Átirányítás a részletező nézetre, ahol megjelennek a film adatai és szereplői
      this.router.navigate(['/film-details', filmId], { state: { details } });
    });
  }
}

