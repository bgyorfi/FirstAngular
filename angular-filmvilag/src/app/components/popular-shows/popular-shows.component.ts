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
  shows : TvShow[] = [];
  pageIndex = "1";
  pageSize = 0;
  totalvalue = 0;
  
  constructor(
    private showService: ShowService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPopularShows();
  }

  paginatorChanged(event : any){
    this.pageIndex = event.pageIndex + 1;
    this.getPopularShows();
  }

  getPopularShows(): void {
    
    this.shows = [];
    this.showService.getPopularTvShwows(this.pageIndex)
      .subscribe(shows => {
        this.shows = shows.results;
        this.totalvalue = shows.total_results
        this.pageSize = shows.results.length
      });
  }

  getPosterUrl(posterPath: string): string {
    console.log(posterPath)
    return environment.imagePath + posterPath;
  }

  viewShowDetails(showId: number): void {
     this.showService.getShowDetailsById(showId).subscribe((details) => {
       // Átirányítás a részletező nézetre, ahol megjelennek a film adatai és szereplői
       this.router.navigate(['/show-detail', showId], { state: { details } });
     });
  }
}
