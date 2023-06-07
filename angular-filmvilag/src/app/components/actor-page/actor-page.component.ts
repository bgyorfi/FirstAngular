import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environment';
import { ActorService } from 'src/app/services/actor.service';
import { ActorDeteils } from 'src/app/models/actor';
import { Cast, MediaType } from 'src/app/models/actor';

@Component({
  selector: 'app-actor-page',
  templateUrl: './actor-page.component.html',
  styleUrls: ['./actor-page.component.css']
})
export class ActorPageComponent {

  actorDetails: ActorDeteils | undefined; // Színész részletei
  actorMovieCast: Cast[] = []; // Színész filmekben való szereplései
  actorTvCast: Cast[] = []; // Színész TV-sorozatokban való szereplései

  constructor(
    private route: ActivatedRoute, // Aktuális útválasztás
    private actorService: ActorService // Színész szolgáltatás
  ) { }

  id: number = 0; // Színész azonosítója

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Az útvonal paraméteréből kinyerjük a színész azonosítót
      this.getActorDetails(this.id); // Lekérdezzük a színész részleteit
      this.getActorKnownFor(this.id); // Lekérdezzük a színész ismert munkáit
    });
  }

  getActorDetails(actorId: number): void {
    this.actorService.getActorById(actorId).subscribe((details) => {
      this.actorDetails = details; // Beállítjuk a színész részleteit
    });
  }

  getActorKnownFor(actorId: number) {
    this.actorService.getActorCredits(actorId).subscribe((cast) => {
      // Szűrjük a szerepléseket filmre vagy TV-sorozatra
      this.actorMovieCast = cast.filter((item) => item.media_type === MediaType.Movie);
      this.actorTvCast = cast.filter((item) => item.media_type === MediaType.Tv);
    });
  }

  getActorProfileUrl(profilePath: string): string {
    return environment.imagePath + profilePath; // Visszaadjuk a színész profil képének elérési útját
  }
}
