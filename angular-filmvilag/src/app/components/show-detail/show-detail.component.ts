import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowService } from 'src/app/services/show.service';
import { environment } from 'src/app/environment';
import { ShowDetail, TvShow, Genre } from 'src/app/models/show';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent {
    details: ShowDetail | undefined; // Műsor részletek

    constructor(
      private route: ActivatedRoute, // Aktivált útvonal szolgáltatás
      private showService: ShowService, // Műsor szolgáltatás
    ) { }

    id: number = 0; // Azonosító

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.id = params['id']; // Azonosító beállítása a paraméterek közül
        this.getShowDetails(this.id); // Műsor részletek lekérése
      });
    }

    getShowDetails(showId: number): void {
        this.showService.getShowDetailsById(showId).subscribe((details) => {
          this.details = details; // Műsor részletek beállítása
        })
    }

  getPosterUrl(poster_path: string | null): string {
    return environment.imagePath + poster_path; // Visszaadjuk a műsor poszterének elérési útját
  }

  getGenresString(genres: Genre[]): string {
    return genres.map(genre => genre.name).join(', '); // Visszaadjuk a műsor műfajainak listáját szöveges formában
  }
}