import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopularFilmsComponent } from './components/popularfilms/popularfilms.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';

const routes: Routes = [
  { path: 'popular-films', component: PopularFilmsComponent },
  { path: 'film-details/:id', component: FilmDetailsComponent },
  { path: '', redirectTo: '/popular-films', pathMatch: 'full' },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
