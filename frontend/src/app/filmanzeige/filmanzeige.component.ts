import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

interface Season {
  id: number;
  number: number;
  description: string;
  showEpisodes: boolean; // Neue Eigenschaft für die Anzeige der Episoden
}

@Component({
  selector: 'app-filmanzeige',
  templateUrl: './filmanzeige.component.html',
  styleUrls: ['./filmanzeige.component.scss']
})

export class FilmanzeigeComponent implements OnInit {
  filmId: string = '';
  likeCount: number = 0;
  alreadyLiked: number = 0;
  dislikeCount: number = 0;
  alreadyDisliked: number = 0;
  kommentarText: string = '';
  kommentare: { id: number; text: string; date: Date, username: string}[] = [];
  contributors: { image: string; first_name: string; last_name: string, role: string}[] = [];
  seasons: { id: number; number: number; description: string; showEpisodes: boolean}[] = [];
  episodes: { number: number; name: string; description: string, runtime: number}[] = [];
  medien: { id: number; image: string}[] = [];
  watchlist: { mediaId: number; image: string}[] = [];
  genres: { id: number; name: string}[] = [];
  positivePercentage: number = 0;
  negativePercentage: number = 0;

  showNotification: boolean = false;
  notificationText: string = '';

  likeClicked: boolean = false;
  dislikeClicked: boolean = false;
  showComments: boolean = false;
  showOverlay: boolean = false;
  kommentarFehler: boolean = false;
  video: string = '';
  fsk: number = 0;
  img: string = '';
  filmname: string = '';
  erscheinungsdatum: Date | undefined = undefined;
  filmbeschreibung: string = '';
  showFilmBeschreibung: boolean = false;
  isLoggedIn: boolean = false; // Variable zur Überprüfung des Authentifizierungsstatus

  videoItems = [
    {
      name: '',
      src: '',
      type: 'video/mp4'
    },
  ];
  activeIndex = 0;
  currentVideo = this.videoItems[this.activeIndex];
  data: any;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router
  ) {
    // Abhören des NavigationEnd-Ereignisses und Zurücksetzen der Scroll-Position
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.filmId = this.activatedRoute.snapshot.paramMap.get('id') || "1";
    this.isLoggedIn = this.checkAuthStatus(); // Überprüfe den Authentifizierungsstatus beim Initialisieren der Komponente
    await this.getFilmData();
    this.getComments();
    this.getRatings();
    this.getAlreadyRated();
    this.getContributors();
    this.getSeasons();
    this.getSimilarMedia();
    this.getWatchlist();
    this.titleService.setTitle('Serio - ' + this.filmname);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });
  }

  isInWatchlist(): boolean {
    return this.watchlist.some(item => item.mediaId === parseInt(this.filmId));
  }

  getWatchlist(): void {
    this.dataService.getWatchlist(1).subscribe(
      (response: any) => {
        console.log(response);
        const medienArray = response.body;
        this.watchlist = medienArray.map((media: { id: any; media: { id: any; image: any; }; }) => ({
          mediaId: media.media.id,
        }));
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Medien:', error);
      }
    );
  }

  deleteWatchlist(): void {
    var mediaId = parseInt(this.filmId);
    this.dataService.deleteWatchlist(mediaId).subscribe(
      (response: any) => {
        console.log('Media with ID ' + mediaId + ' removed successfully.');
      },
      (error: any) => {
        console.error('Fehler beim Entfernen des Mediums:', error);
      }
    );
    this.getWatchlist();
  }

  reloadOnInit(): void {
    this.ngOnInit();
  }

  isPositivePercentageValid(): boolean {
    return !isNaN(this.positivePercentage);
  }

  calculatePercentage(): void {
    const totalVotes = this.likeCount + this.dislikeCount;
    
    this.positivePercentage = Math.round((this.likeCount / totalVotes) * 100);
    this.negativePercentage = Math.round((this.dislikeCount / totalVotes) * 100);
  }  

  getPositivColor(percentage: number): string {
    if (percentage >= 80) {
      return 'rating-very-positive';
    } else {
      return 'rating-positive';
    } 
  }
  
  getNegativColor(percentage: number): string {
    if (percentage >= 80) {
      return 'rating-very-negative';
    } else {
      return 'rating-negative';
    } 
  }  

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Überprüfe, ob der Token vorhanden ist
  }


  toggleLike(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.dislikeCount = 0; // Setze die Anzahl der Dislikes auf 0


      // Bewertung speichern
      this.postRatings(this.likeClicked ? 0 : 1);

      setTimeout(() => {
        this.getRatings();
        this.getAlreadyRated();
      }, 500); // Ändern Sie die Verzögerungszeit nach Bedarf
    } else {
      // Benutzer ist nicht eingeloggt
      this.showNotification = true;
      this.notificationText = 'Für diese Funktion müssen Sie eingeloggt sein!';

      setTimeout(() => {
        this.showNotification = false;
        this.notificationText = '';
      }, 3000);
    }
  }


  toggleDislike(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.dislikeCount = 0; // Setze die Anzahl der Dislikes auf 0


      this.postRatings(this.dislikeClicked ? 1 : 0);

      setTimeout(() => {
        this.getRatings();
        this.getAlreadyRated();
      }, 500); // Ändern Sie die Verzögerungszeit nach Bedarf
    } else {
      this.showNotification = true;
      this.notificationText = 'Für diese Funktion müssen Sie eingeloggt sein!';

      setTimeout(() => {
        this.showNotification = false;
        this.notificationText = '';
      }, 3000);
    }
  }

  toggleComments(): void {
    this.showComments = !this.showComments;
  }

  checkAuthStatus(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Überprüfe, ob der Token vorhanden ist (d.h. ob der Benutzer eingeloggt ist)
  }


  openOverlay(): void {
    this.showOverlay = true;
    this.showFilmBeschreibung = true;
  }

  closeOverlay(): void {
    this.showOverlay = false;
    this.showFilmBeschreibung = false;
  }

  getGenreById(genreId: number): { id: number; name: string } {
    switch (genreId) {
      case 1:
        return { id: 1, name: 'Action' };
      case 2:
        return { id: 2, name: 'Adventure' };
      case 3:
        return { id: 3, name: 'Animation' };
      case 4:
        return { id: 4, name: 'Comedy' };
      case 5:
        return { id: 5, name: 'Crime' };
      case 6:
        return { id: 6, name: 'Drama' };
      case 7:
        return { id: 7, name: 'Fantasy' };
      case 8:
        return { id: 8, name: 'Horror' };
      case 9:
        return { id: 9, name: 'Mystery' };
      case 10:
        return { id: 10, name: 'Romance' };
      case 11:
        return { id: 11, name: 'Sci-Fi' };
      case 12:
        return { id: 12, name: 'Thriller' };
      default:
        return { id: 1, name: 'Unbekanntes Genre' };
    }
  }

  async getFilmData(): Promise<void> {
    try {
      const num = parseInt(this.filmId);
      const data = await this.dataService.getMediaById(num).toPromise();
      console.log('DB-Abfrage für Film:', data);
      this.filmname = data.name;
      this.erscheinungsdatum = new Date(data.release_date);
      this.video = data.video;
      this.filmbeschreibung = data.description;
      this.img = data.image;
      this.fsk = data.fsk;
      console.log('FSK:', this.fsk);
      console.log('Bild:', this.img);
      console.log('Filmname:', this.filmname);
      console.log('Erscheinungsdatum:', this.erscheinungsdatum);
      console.log('video:', this.video);
      console.log('Filmbeschreibung:', this.filmbeschreibung);
      console.log('ShowFilmBeschreibung:', this.showFilmBeschreibung);
  
      // Extrahiere die genreIds
      const genreIds = data.media_genres.map((mediaGenre: { genreId: any; }) => mediaGenre.genreId);
      console.log('Genre-Ids:', genreIds);
  
      // Wandle genreIds in Genres um und weise sie der Variable genres zu
      this.genres = genreIds.map((genreId: number) => this.getGenreById(genreId));
  
    } catch (error) {
      console.error('Fehler beim Abrufen der Filmdaten:', error);
    }
    this.videoItems[0].src = this.video; // Aktualisiere den Quellpfad des Videos
  }

  videoPlayerInit(data: any): void {
    this.data = data;
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo(): void {
    this.activeIndex++;
    if (this.activeIndex === this.videoItems.length) {
      this.activeIndex = 0;
    }
    this.currentVideo = this.videoItems[this.activeIndex];
  }

  

  startPlaylistVdo(item: any, index: number): void {
    this.activeIndex = index;
    this.currentVideo = item;
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('de-DE', options);
  }

  formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('de-DE', options);
  }

  getRatings(): void {
    const mediaId = parseInt(this.filmId);
    this.dislikeCount = 0;
    this.likeCount = 0;
    this.dataService.getRatings(mediaId).subscribe(
      (ratings: any[]) => {
        ratings.forEach((rating: { rating: number }) => {
          if (rating.rating === 1) {
            this.likeCount++;
          } else if (rating.rating === 0) {
            this.dislikeCount++;
          }
        });
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Ratings:', error);
      }
    );
  }

  getAlreadyRated(): void {
    const mediaId = parseInt(this.filmId);
    this.alreadyLiked = 0;
    this.alreadyDisliked = 0;
    this.dataService.getAlreadyRated(mediaId).subscribe(
      (response: any) => {
        const ratings = response.body; // Access the 'body' property to get the array of ratings
        ratings.forEach((rating: { rating: number }) => {
          if (rating.rating === 1) {
            this.alreadyLiked++;
          } else if (rating.rating === 0) {
            this.alreadyDisliked++;
          }
        });
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Ratings:', error);
      }
    );
  }

  getLikeClass() {
    this.calculatePercentage();
    if (this.alreadyLiked === 1) {
      return "like-button liked"; // Klasse mit liked unterklasse
    } else {
      return "like-button"; // Klasse ohne liked unterklasse
    }
  }

  getDislikeClass() {
    this.calculatePercentage();
    if (this.alreadyDisliked === 1) {
      return "dislike-button disliked"; // Klasse mit liked unterklasse
    } else {
      return "dislike-button"; // Klasse ohne liked unterklasse
    }
  }

  getContributors(): void {
    const mediaId = parseInt(this.filmId);
    this.dataService.getContributors(mediaId).subscribe(
      (contributors: any[]) => {
        this.contributors = contributors.map(contributor => ({
          image: contributor.image,
          first_name: contributor.first_name,
          last_name: contributor.last_name,
          role: contributor.role,

        }));
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Mitwirkenden:', error);
      }
    );
  }

  getSeasons(): void {
    const mediaId = parseInt(this.filmId);
    this.dataService.getSeasons(mediaId).subscribe(
      (seasons: any[]) => {
        this.seasons = seasons.map(season => ({
          id: season.id,
          number: season.number,
          description: season.description,
          showEpisodes: season.showEpisodes,
        }));
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Staffeln:', error);
      }
    );
  }

  // Definition der Funktion "toggleEpisodes" mit einem Parameter "season" vom Typ "Season"
toggleEpisodes(season: Season): void {

  this.seasons.forEach((s) => {
    if (s !== season) {
      s.showEpisodes = false;
    }
  });

  // Überprüfen, ob die Episoden der aktuellen Staffel bereits angezeigt werden
  if (season.showEpisodes) {
    // Wenn die Episoden bereits angezeigt werden, setzen wir den Zustand auf "false", um sie zu verbergen
    season.showEpisodes = false;
  } else {
    // Wenn die Episoden noch nicht angezeigt werden
    // Die ID der ausgewählten Staffel erhalten
    const seasonId = season.id;

    // Die Episoden für die ausgewählte Staffel abrufen (Voraussetzung: Es gibt eine Funktion "getEpisodes", die die Episoden abruft)
    this.getEpisodes(seasonId);

    // Den Zustand auf "true" setzen, um die Episoden anzuzeigen
    season.showEpisodes = true;
  }
}

  getEpisodes(seasonId: number): void {
    this.episodes = [];
    this.dataService.getEpisodes(seasonId).subscribe(
      (episodes: any[]) => {
        this.episodes = episodes.map(episode => ({
          number: episode.number,
          name: episode.name,
          description: episode.description,
          runtime: episode.runtime,
        }));
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Episoden:', error);
      }
    );
  }

  getComments(): void {
    const mediaId = parseInt(this.filmId);
    this.dataService.getComments(mediaId).subscribe(
      (comments: any[]) => {
        this.kommentare = comments.map(comment => ({
          id: comment.id,
          text: comment.text,
          date: new Date(comment.date),
          username: comment.username,

        }));
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Kommentare:', error);
      }
    );
  }

  kommentarSpeichern(): void {
    const token = localStorage.getItem('token');
    if (token) {
      if (this.kommentarText.length >= 10) {
        const comment = {
          text: this.kommentarText,
          mediaId: this.filmId
        };
        console.log("test1");
        this.dataService.postComments(comment).subscribe(
          (response: any) => {
            this.getComments();
            console.log('Kommentar gespeichert:', response);
            //this.kommentare.push({ id: response.id, text: this.kommentarText, date: new Date() });
            this.kommentarText = '';
            this.kommentarFehler = false;
          },
          (error: any) => {
            console.error('Fehler beim Speichern des Kommentars:', error);
          }
        );
      } else {
        this.kommentarFehler = true;
      }
    } else {
      this.showNotification = true;
      this.notificationText = 'Für diese Funktion müssen Sie eingeloggt sein!';

      setTimeout(() => {
        this.showNotification = false;
        this.notificationText = '';
      }, 3000);
    }
  }

  postRatings(rating: number): void {
    const ratingData = {
      rating: rating,
      mediaId: this.filmId
    };
    this.dataService.postRatings(ratingData).subscribe(
      (response: any) => {
        console.log('Bewertung gespeichert:', response);
      },
      (error: any) => {
        console.error('Fehler beim Speichern der Bewertung:', error);
      }
    );
  }

  getSimilarMedia(): void {
    const mediaId = parseInt(this.filmId);
    
    this.dataService.getSimilarMedia(mediaId).subscribe(
      (medien: any[]) => {  
        this.medien = medien.map(media => ({
          id: media.id,
          image: media.image,
        }));
        console.log('Ähnliche Medien:', this.medien);
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Änhlichen Filme und Serien:', error);
      }
    );
  }

  createWatchlist(): void {
    const mediaId = parseInt(this.filmId);
    this.dataService.createWatchlist(mediaId).subscribe(
      (response: any) => {
        console.log('Zur Watchlist hinzugefügt:', response);
        this.getWatchlist();
      },
      (error: any) => {
        console.error('Fehler beim hinzufügen zur Watchlist:', error);
      }
    );
  }

}

