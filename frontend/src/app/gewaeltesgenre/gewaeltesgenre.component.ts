import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gewaeltesgenre',
  templateUrl: './gewaeltesgenre.component.html',
  styleUrls: ['./gewaeltesgenre.component.scss']
})

export class GewaeltesgenreComponent implements OnInit {
  filmId: number = 0;
  genreName: string = '';

  movies: { id: number, image: string }[] = [];
  series: { id: number, image: string }[] = [];
  displayedMedia: { id: number, image: string }[] = [];
  showMovies: boolean = true;
  mediaLoaded: boolean = false;
  toggleIndicatorTransform: string = '';

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private titleService: Title,) { }

  ngOnInit(): void {
    const genreId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0');
    this.getGenreById(genreId);
    this.titleService.setTitle('Serio - ' + this.genreName);
    this.getMediaByGenreId(genreId);
    this.updateToggleIndicator();
  }

  getGenreById(genreId: number) {
    switch (genreId) {
      case 1:
        this.genreName = 'Action';
        return;
      case 2:
        this.genreName = 'Adventure';
        return;
      case 3:
        this.genreName = 'Animation';
        return;
      case 4:
        this.genreName = 'Comedy';
        return;
      case 5:
        this.genreName = 'Crime';
        return;
      case 6:
        this.genreName = 'Drama';
        return;
      case 7:
        this.genreName = 'Fantasy';
        return;
      case 8:
        this.genreName = 'Horror';
        return;
      case 9:
        this.genreName = 'Mystery';
        return;
      case 10:
        this.genreName = 'Romance';
        return;
      case 11:
        this.genreName = 'Sci-Fi';
        return;
      case 12:
        this.genreName = 'Thriller';
        return;
      default:
        this.genreName = 'Unbekanntes Genre';
        return;
    }
  }

  getMediaByGenreId(genreId: number): void {
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
    );

    this.dataService.getSerieByGenreId(genreId).subscribe(
      (series: any) => {
        this.series = series.map((serie: any) => {
          return {
            id: serie.id,
            image: serie.image
          };
        });
      },
      (error) => {
        console.error('Fehler beim Abrufen der Serien:', error);
      }
    );
  }

  toggleDisplay(showMovies: boolean): void {
    this.showMovies = showMovies;
    this.displayedMedia = showMovies ? this.movies : this.series;
    this.updateToggleIndicator();
  }

  updateToggleIndicator(): void {
    const translateX = this.showMovies ? '0%' : '100%';
    this.toggleIndicatorTransform = `translateX(${translateX})`;
  }

  onImageLoad(): void {
    this.mediaLoaded = true;
  }
}
