import { Component, OnInit} from '@angular/core';
import { ActorService} from 'src/app/services/actor.service';
import { Actor, Actors, ActorDeteils } from 'src/app/models/actor';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent {
  actors: Actor[] = []
  pageIndex = "1";
  pageSize = 0;
  totalvalue = 0;
  searchKeyword: string = "";

  constructor(
    private actorService: ActorService,
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.getPopularActor();
  }

  paginatorChanged(event : any){
    this.pageIndex = event.pageIndex + 1;
    this.getPopularActor();
  }

  getPopularActor(): void{
    this.actors = [];
    this.actorService.getActorList(this.pageIndex).subscribe(actors =>
      {
        this.actors = actors.results
        this.totalvalue = actors.total_results
        this.pageSize = actors.results.length
      })
  }

  getPosterUrl(profile_path: string): string {
    console.log(profile_path)
    return environment.imagePath + profile_path;
  }

  viewActorDetails(actorId: number): void {
    this.actorService.getActorById(actorId).subscribe((details) => {
      this.router.navigate(['/actor-page', actorId], { state: { details } });
    });
  }

  getActorsByParam(paging: boolean = false){
    if (!paging) this.pageIndex = '1'
    this.actors = [];
    this.searchService.getActorBySearch(this.pageIndex, this.searchKeyword)
    .subscribe(films => {
      this.actors = films.results;
      this.totalvalue = films.total_results
      
    });
  }
}
