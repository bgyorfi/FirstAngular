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
    details : ShowDetail |undefined;

    constructor(
      private route: ActivatedRoute,
      private showService: ShowService,
    ) { }

    id: number = 0;

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.getShowDetails(this.id);
      });
    }

    getShowDetails(showId: number): void {
        this.showService.getShowDetailsById(showId).subscribe((details) => {
          this.details = details;
        })

    }

  getPosterUrl(poster_path: string | null): string {
    return environment.imagePath + poster_path;
  }

  getGenresString(genres: Genre[]): string {
    return genres.map(genre => genre.name).join(', ');
  }

}
