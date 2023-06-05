import { Component, OnInit } from '@angular/core';
import { PopularFilms } from 'src/app/services/popular-films.service';
import { Result } from 'src/app/models/popularfilm';
import { environment } from 'src/app/environment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-popular-films',
  templateUrl: './popularfilms.component.html',
  styleUrls: ['./popularfilms.component.css']
})
export class PopularFilmsComponent implements OnInit {

  popularFilms: Result[] = [];
  pageIndex = "1";
  pageSize = 5;

  displayedColumns: string[] = ['poster', 'title', 'release_date'];
  constructor(private popularFilmsService: PopularFilms) { }

  ngOnInit(): void {
    console.info('PopularFilmsComponent OnInit.');
    this.getPopularFilms();
  }

  paginatorChanged(event : any){
    this.pageSize = event.pageSize;
    console.log(event.pageIndex);
    this.pageIndex = event.pageIndex + 1;
    this.getPopularFilms();
  }

  getPopularFilms(): void {
    this.popularFilms = [];
    this.popularFilmsService.getPopularFilms(this.pageIndex)
      .subscribe(films => {
        this.popularFilms = films;
      });
  }


  getPosterUrl(posterPath: string): string {
    console.log(posterPath)
    return environment.imagePath + posterPath;
  }
}
