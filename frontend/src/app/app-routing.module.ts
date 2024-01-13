import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartseiteComponent } from './startseite/startseite.component';
import { HauptseiteComponent } from './hauptseite/hauptseite.component';
import { LoginComponent } from './login/login.component';
import { GenreseiteComponent } from './genreseite/genreseite.component';
import { FilmanzeigeComponent } from './filmanzeige/filmanzeige.component';
import { GewaeltesgenreComponent } from './gewaeltesgenre/gewaeltesgenre.component';
import { BenutzereinstellungenComponent } from './benutzereinstellungen/benutzereinstellungen.component';
import { SuchergebnisseComponent } from './suchergebnisse/suchergebnisse.component';
import { KopfzeileComponent } from './kopfzeile/kopfzeile.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'startseite', pathMatch: 'full' },
  { path: 'startseite', component: StartseiteComponent },
  { path: 'hauptseite', component: HauptseiteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'genre', component: GenreseiteComponent },
  { path: 'filmanzeige', component: FilmanzeigeComponent },
  { path: 'gewaeltesgenre', component: GewaeltesgenreComponent },
  { path: 'benutzereinstellungen', component: BenutzereinstellungenComponent },
  { path: 'filmanzeige/:id', component: FilmanzeigeComponent },
  { path: 'genre/:id', component: GewaeltesgenreComponent },
  { path: 'suchergebnisse', component: SuchergebnisseComponent},
  { path: 'kopfzeile/:term', component: SuchergebnisseComponent},
  { path: 'benutzereinstellungen', component: BenutzereinstellungenComponent},
  { path: 'watchlist', component: WatchlistComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
