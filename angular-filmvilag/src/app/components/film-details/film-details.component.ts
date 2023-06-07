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

  details: FilmDetails | undefined; // Film részletei
  credits: Credits | undefined; // Film stáblistája
  video: SafeResourceUrl | undefined; // Biztonságos beágyazott videó URL

  constructor(
    private route: ActivatedRoute, // Aktuális útválasztás
    private filmDetailsService: FilmDetailsService, // Film részletek szolgáltatás
    private sanitizer: DomSanitizer // DOM biztonsági szolgáltatás
  ) { }

  id: number = 0; // Film azonosítója

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Az útvonal paraméteréből kinyerjük a film azonosítót
      this.getFilmDetails(this.id); // Lekérdezzük a film részleteit
      this.getFilmVideo(this.id); // Lekérdezzük a film videóját
    });
  }

  getFilmDetails(filmId: number): void {
    this.filmDetailsService.getFilmDetails(filmId).subscribe((details) => {
      this.details = details; // Beállítjuk a film részleteit
      this.getCredits(filmId); // Lekérdezzük a film stáblistáját
    });
  }

  getFilmVideo(filmId: number): void {
    this.filmDetailsService.getFilmVideo(filmId).subscribe((videos) => {
      const trailerVideo = videos.find((video) => video.type === "Trailer" && video.site === 'YouTube');
      if (trailerVideo) {
        const videoUrl = `https://www.youtube.com/embed/${trailerVideo.key}`;
        this.video = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl); // Biztonságosan beágyazott videó URL létrehozása
      }
    })
  }

  getCredits(filmId: number): void {
    this.filmDetailsService.getFilmCredits(filmId).subscribe((credits) => {
      this.credits = credits; // Beállítjuk a film stáblistáját
    });
  }

  getPosterUrl(posterPath: string | null): string {
    return environment.imagePath + posterPath; // Visszaadjuk a film borítóképének elérési útját
  }

  getActorProfileUrl(profilePath: string): string {
    return environment.imagePath + profilePath; // Visszaadjuk a színész profil képének elérési útját
  }
}


