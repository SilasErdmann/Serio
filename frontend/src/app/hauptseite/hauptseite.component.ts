import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

interface Film {
  id: number;
  name: string;
  bildUrl: string;
}

interface Filmkategorie {
  genreId: number;
  name: string;
  filme: Film[];
}

@Component({
  selector: 'app-hauptseite',
  templateUrl: './hauptseite.component.html',
  styleUrls: ['./hauptseite.component.scss'],
})
export class HauptseiteComponent {
  @ViewChildren('filmContainer') filmContainers!: QueryList<ElementRef>;
  scrollPositions: { [key: number]: number } = {};
  latestMedien: { id: number; image: string}[] = [];
  bestRatedMedien: { id: number; image: string}[] = [];
  upcomingMedien: { id: number; image: string}[] = [];
  filmkategorien: Filmkategorie[] = [
    {
      name: 'Action',
      genreId: 1,
      filme: []
    },

    {
      name: 'Adventure',
      genreId: 2,
      filme: []
    },

    {
      name: 'Animation',
      genreId: 3,
      filme: []
    },

    {
      name: 'Comedy',
      genreId: 4,
      filme: []
    },

    {
      name: 'Crime',
      genreId: 5,
      filme: []
    },

    {
      name: 'Drama',
      genreId: 6,
      filme: []
    },

    {
      name: 'Fantasy',
      genreId: 7,
      filme: []
    },

    {
      name: 'Horror',
      genreId: 8,
      filme: []
    },

    {
      name: 'Mystery',
      genreId: 9,
      filme: []
    },

    {
      name: 'Romance',
      genreId: 10,
      filme: []
    },

    {
      name: 'Sci-Fi',
      genreId: 11,
      filme: []
    },

    {
      name: 'Thriller',
      genreId: 12,
      filme: []
    }

  ];

  currentPage = 1; // Die aktuelle Seitenzahl

  constructor(private dataService: DataService, private titleService: Title, private router: Router) {}

  ngOnInit() {
    const newTitle = 'Hauptseite'; // Hier kannst du den Namen des Tabs anpassen
    this.titleService.setTitle('Serio - ' + newTitle);
    this.fetchFilmeFromDatabase();
    this.getLatestMedia();
    this.getBestRatedMedia();
    this.getUpcomingMedia();
  }

  fetchFilmeFromDatabase() {
    this.filmkategorien.forEach((kategorie) => {
      this.dataService.getMediaByGenre(kategorie.genreId, this.currentPage).subscribe(
        (filme) => {
          console.log('Abgefragte Filme:', filme);
          kategorie.filme = filme.map((film: any) => ({
            id: film.id,
            name: film.name,
            bildUrl: film.image,
            
          }));
        },
        (error) => {
          // Fehlerbehandlung, falls die Anfrage fehlschlägt
          console.error('Fehler beim Laden der Filme:', error);
        }
      );
    });
  }

  scroll(direction: string, kategorie: Filmkategorie) {
    const containerIndex = this.filmkategorien.indexOf(kategorie);

    if (!this.scrollPositions[containerIndex]) {
      this.scrollPositions[containerIndex] = 0;
    }

    const container = this.filmContainers.toArray()[containerIndex].nativeElement;
    const containerWidth = container.offsetWidth;
    const scrollDistance = containerWidth * 0.01;

    if (direction === 'prev') {
      this.scrollPositions[containerIndex] += scrollDistance;
    } else {
      this.scrollPositions[containerIndex] -= scrollDistance;
    }

    container.style.transform = `translateX(${this.scrollPositions[containerIndex]}px)`;

    // Aktualisiere die Seitenzahl, aber begrenze sie auf maximal 2
    if (direction === 'prev') {
      this.currentPage = Math.max(1, this.currentPage - 1);
    } else {
      this.currentPage = Math.min(2, this.currentPage + 1);
    }

    // Führe die Datenbankabfrage mit der aktualisierten Seitenzahl durch
    this.dataService.getMediaByGenre(kategorie.genreId, this.currentPage).subscribe((filme) => {
      kategorie.filme = filme.map((film: any) => ({
        id: film.id,
        name: film.name,
        bildUrl: film.image,
      }));
    });
  }


  navigateToGenre(genreId: number) {
    this.router.navigate(['/genre', genreId]);
  }



  latestMediaPage = 1;

  getLatestMedia(): void {
    this.dataService.getLatestMedia(this.latestMediaPage).subscribe(
      (latestMedien: any[]) => {
        this.latestMedien = latestMedien.map(media => ({
          id: media.id,
          image: media.image,

        }));
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Medien:', error);
      }
    );
    console.log('latestMedia:', this.latestMedien);
  }

  LatestMediaScrollPrevious(): void {
    if (this.latestMediaPage > 1) {
      this.latestMediaPage--;
      this.getLatestMedia();
    }
  }

  LatestMediaScrollNext(): void {
    this.latestMediaPage++;
    this.getLatestMedia();
  }

  bestRatedMediaPage = 1;

  getBestRatedMedia(): void {
    this.dataService.getBestRatedMedia(this.bestRatedMediaPage).subscribe(
      (bestRatedMedien: any[]) => {
        this.bestRatedMedien = bestRatedMedien.map(media => ({
          id: media.id,
          image: media.image,
        }));
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Medien:', error);
      }
    );
  }
  
  BestRatedMediaScrollPrevious(): void {
    if (this.bestRatedMediaPage > 1) {
      this.bestRatedMediaPage--;
      this.getBestRatedMedia();
    }
  }
  
  BestRatedMediaScrollNext(): void {
    this.bestRatedMediaPage++;
    this.getBestRatedMedia();
  }

  upcomingMediaPage = 1;

  getUpcomingMedia(): void {
    this.dataService.getUpcomingMedia(this.upcomingMediaPage).subscribe(
      (upcomingMedien: any[]) => {
        this.upcomingMedien = upcomingMedien.map(media => ({
          id: media.id,
          image: media.image,
        }));
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Medien:', error);
      }
    );
  }
  
  UpcomingMediaScrollPrevious(): void {
    if (this.upcomingMediaPage > 1) {
      this.upcomingMediaPage--;
      this.getUpcomingMedia();
    }
  }
  
  UpcomingMediaScrollNext(): void {
    this.upcomingMediaPage++;
    this.getUpcomingMedia();
  }

}
