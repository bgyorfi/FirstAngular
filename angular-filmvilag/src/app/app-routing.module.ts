import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopularFilmsComponent } from './components/popularfilms/popularfilms.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { PopularShowsComponent } from './components/popular-shows/popular-shows.component';
import { ActorPageComponent } from './components/actor-page/actor-page.component';
import { ActorListComponent } from './components/actor-list/actor-list.component';
import { ShowDetailComponent } from './components/show-detail/show-detail.component';

const routes: Routes = [
  { path: 'popular-films', component: PopularFilmsComponent },
  { path: 'popular-tvshows', component: PopularShowsComponent },
  { path: 'actor-list', component: ActorListComponent },
  { path: 'film-details/:id', component: FilmDetailsComponent },
  { path: 'actor-page/:id', component: ActorPageComponent },
  { path: 'show-detail/:id', component: ShowDetailComponent },
  { path: '', redirectTo: '/popular-films', pathMatch: 'full' },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
