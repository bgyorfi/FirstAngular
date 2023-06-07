import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmDetailsService } from 'src/app/services/film-details.service';
import { FilmDetails, Cast, Credits } from 'src/app/models/filmdetails';
import { environment } from 'src/app/environment';
import { Video } from 'src/app/models/videodetails';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-film-details', 
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {

  details : FilmDetails | undefined ;
  credits : Credits | undefined;
  video: SafeResourceUrl | undefined;


  constructor(
    private route: ActivatedRoute,
    private filmDetailsService: FilmDetailsService,
    private sanitizer: DomSanitizer
  ) { }
  
  id: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getFilmDetails(this.id);
      this.getFilmVideo(this.id)
    });
  }

  getFilmDetails(filmId: number): void {
    this.filmDetailsService.getFilmDetails(filmId).subscribe((details) => {
      this.details = details;
      this.getCredits(filmId); // Hozzáadott credits lekérése
    });
  }

  getFilmVideo(filmId: number): void {
    this.filmDetailsService.getFilmVideo(filmId).subscribe((videos) =>{
      const trailerVideo = videos.find((video) => video.type==="Trailer" && video.site === 'YouTube');
      if (trailerVideo) {
        const videoUrl = `https://www.youtube.com/embed/${trailerVideo.key}`;
        this.video = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
      }
    })
  }

  getCredits(filmId: number): void {
    this.filmDetailsService.getFilmCredits(filmId).subscribe((credits) => {
      this.credits = credits;
    });
  }

  getPosterUrl(posterPath: string | null): string {
      return environment.imagePath + posterPath;
  }

  getActorProfileUrl(profilePath: string): string {
    return environment.imagePath + profilePath;
  }
}

