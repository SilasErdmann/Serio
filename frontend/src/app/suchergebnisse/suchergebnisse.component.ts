import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-suchergebnisse',
  templateUrl: './suchergebnisse.component.html',
  styleUrls: ['./suchergebnisse.component.scss']
})

export class SuchergebnisseComponent implements OnInit {
  term: string =''
  movies: { id: number, image: string }[] = [];

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.term = params.get('term') || '';
      this.getSuchergebnisse(this.term);
    }); 
    const newTitle = 'Suche'; // Hier kannst du den Namen des Tabs anpassen
    this.titleService.setTitle('Serio - ' + newTitle);
  }

  getSuchergebnisse(term: string): void {
    this.dataService.getSearchedMedia(term).subscribe(
      (movies: any) => {
        this.movies = movies.map((movie: any) => {
          return {
            id: movie.id,
            image: movie.image
          };
        });

        console.log('Daten aus der Datenbankabfrage:', this.movies);
      },
      (error) => {
        console.error('Fehler beim Abrufen der Filme:', error);
      }
    );
  }

  navigateToFilmAnzeige(movieId: number): void {
    this.router.navigate(['/filmanzeige', movieId]);
  }

}
 /* export class GewaeltesgenreComponent implements OnInit {
    filmId: number = 0;

    movies: { id: number, image: string }[] = [];
    series: { id: number, image: string }[] = [];
    displayedMedia: { id: number, image: string }[] = [];
    showMovies: boolean = true;
    mediaLoaded: boolean = false;
    toggleIndicatorTransform: string = '';
    constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) { }
    ngOnInit(): void {
      const genreId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0');
      this.getMediaByGenreId(genreId);
      this.updateToggleIndicator();
    } */
 /* getMediaByGenreId(genreId: number): void {
    this.dataService.getMoviesByGenreId(genreId).subscribe(
      (movies: any) => {
        this.movies = movies.map((movie: any) => {
          return {
            id: movie.id,
            image: movie.image
          };
        });
        this.displayedMedia = this.movies;
        this.filmId = genreId;

        console.log('Movies:', this.movies);
        console.log('Film ID:', this.filmId);
      },
      (error) => {
        console.error('Fehler beim Abrufen der Filme:', error);
      }
    );*/