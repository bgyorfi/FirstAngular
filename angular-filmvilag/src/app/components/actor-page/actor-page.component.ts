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

  actorDetails: ActorDeteils | undefined;
  actorMovieCast : Cast[] = [];
  actorTvCast : Cast[] = [];
  constructor(
    private route: ActivatedRoute,
    private actorService: ActorService
  ) { }

  id: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getActorDetails(this.id);
      this.getActorKnownFor(this.id);
    });
    
  }

  getActorDetails(actorId: number): void {
    this.actorService.getActorById(actorId).subscribe((details) => {
      this.actorDetails = details;
    });
  }

  getActorKnownFor(actordId: number){
    this.actorService.getActorCredits(actordId).subscribe((cast) => {
      this.actorMovieCast = cast.filter((item) => item.media_type === MediaType.Movie);
      this.actorTvCast = cast.filter((item) => item.media_type === MediaType.Tv);
    });

  }

  getActorProfileUrl(profilePath: string): string {
    return environment.imagePath + profilePath;
  }
}
