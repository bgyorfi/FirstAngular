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
  actors: Actor[] = []; // Színészek tömbje
  pageIndex = "1"; // Aktuális oldalszám
  pageSize = 0; // Oldalméret
  totalvalue = 0; // Elemek összes száma
  searchKeyword: string = ""; // Keresési kulcsszó

  constructor(
    private actorService: ActorService, // Színész szolgáltatás
    private router: Router, // Router példány
    private searchService: SearchService // Keresési szolgáltatás
  ) { }

  ngOnInit(): void {
    this.getPopularActor(); // Alkalmazás betöltésekor népszerű színészek lekérése
  }

  paginatorChanged(event: any) {
    this.pageIndex = event.pageIndex + 1; // Oldalszám beállítása a lapozó változása alapján
    this.getPopularActor(); // Újra lekérjük a színészeket az új oldalszám alapján
  }

  getPopularActor(): void {
    this.actors = []; // Törljük a színészek tömbjét
    this.actorService.getActorList(this.pageIndex).subscribe(actors => {
      // Az elérhető színészek eredményeit beállítjuk a színészek tömbjébe
      this.actors = actors.results;
      this.totalvalue = actors.total_results; // Beállítjuk az összes elem számát
      this.pageSize = actors.results.length; // Beállítjuk az oldalméretet
    });
  }

  getPosterUrl(profile_path: string): string {
    return environment.imagePath + profile_path; // Visszaadjuk a kép teljes elérési útját
  }

  viewActorDetails(actorId: number): void {
    this.actorService.getActorById(actorId).subscribe((details) => {
      // Átirányítjuk az útválasztót az adott színész oldalára a színész azonosítóval és az adatokkal
      this.router.navigate(['/actor-page', actorId], { state: { details } });
    });
  }

  getActorsByParam(paging: boolean = false) {
    if (!paging) {
      this.pageIndex = '1'; // Ha nem lapozunk, akkor az oldalszámot 1-re állítjuk
    }
    this.actors = []; // Törljük a színészek tömbjét
    this.searchService.getActorBySearch(this.pageIndex, this.searchKeyword)
      .subscribe(films => {
        this.actors = films.results; // Az elérhető színészek eredményeit beállítjuk a színészek tömbjébe
        this.totalvalue = films.total_results; // Beállítjuk az összes elem számát
      });
  }
}





