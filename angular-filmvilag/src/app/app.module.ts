import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PopularFilmsComponent } from './components/popularfilms/popularfilms.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { PopularShowsComponent } from './components/popular-shows/popular-shows.component';
import { ActorPageComponent } from './components/actor-page/actor-page.component';
import { ActorListComponent } from './components/actor-list/actor-list.component';
import { ShowDetailComponent } from './components/show-detail/show-detail.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    PopularFilmsComponent,
    FilmDetailsComponent,
    SafeUrlPipe,
    PopularShowsComponent,
    ActorPageComponent,
    ActorListComponent,
    ShowDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatIconModule,
    HttpClientModule,
    MatPaginatorModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
