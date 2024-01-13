import { ApplicationModule, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import von HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { HauptseiteComponent } from './hauptseite/hauptseite.component';
import { KopfzeileComponent } from './kopfzeile/kopfzeile.component';
import { LoginComponent } from './login/login.component';
import { GenreseiteComponent } from './genreseite/genreseite.component';
import { FilmanzeigeComponent } from './filmanzeige/filmanzeige.component';
import { GewaeltesgenreComponent } from './gewaeltesgenre/gewaeltesgenre.component';
import { CommonModule } from '@angular/common';
import { BenutzereinstellungenComponent } from './benutzereinstellungen/benutzereinstellungen.component';
import { DataService } from './data.service'; // Import des DataService
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VdoPlayerComponent } from './vdo-player/vdo-player.component';
import { SuchergebnisseComponent } from './suchergebnisse/suchergebnisse.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WatchlistComponent } from './watchlist/watchlist.component';

@NgModule({
  declarations: [
    AppComponent,
    StartseiteComponent,
    HauptseiteComponent,
    KopfzeileComponent,
    LoginComponent,
    GenreseiteComponent,
    FilmanzeigeComponent,
    GewaeltesgenreComponent,
    BenutzereinstellungenComponent,
    VdoPlayerComponent,
    SuchergebnisseComponent,
    WatchlistComponent,

  ],
  imports: [
    ApplicationModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // Add this line to import and configure ToastrModule,
    BrowserAnimationsModule, // or NoopAnimationsModule if you don't want animations
  ],
  exports: [
    StartseiteComponent,
    HauptseiteComponent,
    KopfzeileComponent,
    LoginComponent,
    GenreseiteComponent,
    FilmanzeigeComponent,
    GewaeltesgenreComponent,
    WatchlistComponent,
  ],
  providers: [DataService], // Hinzufügen des DataService in die providers-Liste
  bootstrap: [AppComponent]
})
export class AppModule {}