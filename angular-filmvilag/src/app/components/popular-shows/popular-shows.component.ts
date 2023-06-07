import { Component, OnInit } from '@angular/core';

import { environment } from 'src/app/environment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ShowService } from 'src/app/services/show.service';
import { TvShow } from 'src/app/models/show';

@Component({
  selector: 'app-popular-shows',
  templateUrl: './popular-shows.component.html',
  styleUrls: ['./popular-shows.component.css']
})
export class PopularShowsComponent implements OnInit {
  shows: TvShow[] = []; // Népszerű sorozatok
  pageIndex = "1"; // Oldalszám
  pageSize = 0; // Oldalméret
  totalvalue = 0; // Összes elem száma

  constructor(
    private showService: ShowService, // Sorozat szolgáltatás
    private router: Router, // Router szolgáltatás
  ) { }

  ngOnInit(): void {
    this.getPopularShows(); // Népszerű sorozatok lekérése
  }

  paginatorChanged(event: any) {
    this.pageIndex = event.pageIndex + 1; // Az oldalszám beállítása
    this.getPopularShows(); // Népszerű sorozatok lekérése
  }

  getPopularShows(): void {
    this.shows = [];
    this.showService.getPopularTvShows(this.pageIndex)
      .subscribe(shows => {
        this.shows = shows.results; // Népszerű sorozatok beállítása
        this.totalvalue = shows.total_results; // Összes elem számának beállítása
        this.pageSize = shows.results.length; // Oldalméret beállítása
      });
  }

  getPosterUrl(posterPath: string): string {
    console.log(posterPath);
    return environment.imagePath + posterPath; // Visszaadjuk a sorozat poszterének elérési útját
  }

  viewShowDetails(showId: number): void {
    this.showService.getShowDetailsById(showId).subscribe((details) => {
      // Átirányítás a részletező nézetre, ahol megjelennek a sorozat adatai és szereplői
      this.router.navigate(['/show-detail', showId], { state: { details } });
    });
  }
}