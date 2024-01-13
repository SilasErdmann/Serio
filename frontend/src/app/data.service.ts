import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DataService {
  private backendUrl = 'http://localhost:3000';
  private userData: any; // Variable zum Speichern der Benutzerdaten
  private token: string | null = null;
  private username: string | null = null;
  usernameSubject: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  Test(): Observable<any> {
    const url = `${this.backendUrl}/users/alice/123456`; //Endpunkt entsprechend deiner Backend-API
    return this.http.get(url);
  }

 /* login(username: string, password: string): Observable<any> {
    const url = `${this.backendUrl}/users/${username}/${password}`;
    return this.http.get(url)
      .pipe(
        tap((data: any) => {
          this.userData = data; // Speichere die Benutzerdaten in der Variable
          console.log('Eingeloggt:', this.userData);
        })
      );
  } */

  getUserData(): Observable<any> {
    const url = `${this.backendUrl}/users/`;
    return this.http.get(url);
  }

  getMediaByGenre(genreId: number, page: number): Observable<any> {
    const url = `${this.backendUrl}/media/genre/${genreId}/${page}`;
    return this.http.get(url);
  }

  getMediaById(filmId: number): Observable<any> {
    const url = `${this.backendUrl}/media/${filmId}`;
    return this.http.get(url);
  }

  getMoviesByGenreId(genreId: number): Observable<any> {
    const url = `${this.backendUrl}/media/movies/${genreId}/1`; //1 steht für Page
    return this.http.get(url);
  }

  getSerieByGenreId(genreId: number): Observable<any> {
    const url = `${this.backendUrl}/media/series/${genreId}/1`;
    return this.http.get(url);
  }

  login(form: any): Observable<any> {
    const url = `${this.backendUrl}/users/login`;
    const body = { ...form };
    console.log(body);

    return this.http.post(url, body).pipe(
      tap((response: any) => {
        if (response.token) {

          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
        }
        console.log('Login-Antwort:', response);
      })
    );
  }


  createUser(form: any): Observable<any> {
    const url = `${this.backendUrl}/users`;
    const body = { ...form };
    return this.http.post(url, body).pipe(
      tap((response: any) => {
        // Verarbeite die Antwort nach erfolgreicher Registrierung
        console.log('Registrierungsantwort:', response);
      })
    );
  }

  getStoredToken(): string | null {
  return localStorage.getItem('token') || null;
}


  getUsername(): string | null{
    return localStorage.getItem('username');
  }

  updateUsername(username: string) {
    this.username = username;
    this.usernameSubject.next(username);
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  getContributors(mediaId: number): Observable<any> {
    const url = `${this.backendUrl}/contributors/${mediaId}/1`;
    return this.http.get(url).pipe(
      tap((response: any) => {
        console.log('Contributors:', response);
      })
    );
  }

  getSeasons(mediaId: number): Observable<any> {
    const url = `${this.backendUrl}/seasons/${mediaId}`;
    return this.http.get(url).pipe(
      tap((response: any) => {
        console.log('Seasons:', response);
      })
    );
  }

  getEpisodes(seasonId: number): Observable<any> {
    const url = `${this.backendUrl}/episodes/${seasonId}`;
    return this.http.get(url).pipe(
      tap((response: any) => {
        console.log('Episodes:', response);
      })
    );
  }

  getComments(mediaId: number): Observable<any> {
    const url = `${this.backendUrl}/comments/${mediaId}/1`;
    return this.http.get(url).pipe(
      tap((response: any) => {
        console.log('Kommentare:', response);
      })
    );
  }

  postComments(form: any): Observable<HttpResponse<any>> {
    const url = `${this.backendUrl}/comments`;
    const token = this.getStoredToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` || '');
    const body = { ...form };
    console.log(token);
    console.log('Kommentar wird gesendet:', body);
    return this.http.post<any>(url, body, { headers, observe: 'response' });
  }

  getRatings(mediaId: number): Observable<any> {
    const url = `${this.backendUrl}/ratings/media/${mediaId}`;
    return this.http.get(url).pipe(
      tap((response: any) => {
        console.log('Ratings:', response);
      })
    );
  }

  getAlreadyRated(mediaId: number): Observable<any> {
    const url = `${this.backendUrl}/ratings/${mediaId}`;
    const token = this.getStoredToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` || '');

    return this.http.get<any>(url, { headers, observe: 'response' });
  }


  postRatings(form: any): Observable<HttpResponse<any>> {
    const url = `${this.backendUrl}/ratings`;
    const token = this.getStoredToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` || '');
    const body = { ...form };
    console.log(token);
    console.log('Rating wird gesendet:', body);
    return this.http.post<any>(url, body, { headers, observe: 'response' });
  }

   //Mapped {/media/search/:term/:page, GET}
    getSearchedMedia(term: any): Observable<any> {
      const url = `${this.backendUrl}/media/search/${term}/1`;
      return this.http.get(url);

    }

    updateUserData(form: any): Observable<HttpResponse<any>> {
      const url = `${this.backendUrl}/users`;
      const token = this.getStoredToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` || '');
      const body = { ...form };
      console.log(token);
      console.log('Rating wird gesendet:', body);
      return this.http.put<any>(url, body, { headers, observe: 'response' });
    }

    deleteUserData(): Observable<HttpResponse<any>> {
      const url = `${this.backendUrl}/users`;
      const token = this.getStoredToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` || '');
      return this.http.delete<any>(url, { headers, observe: 'response' });
    }

    getSimilarMedia(mediaId: number): Observable<any> {
      const url = `${this.backendUrl}/media/${mediaId}/1`;
      return this.http.get(url);
    }

    getLatestMedia(page: number): Observable<any> {
      const url = `${this.backendUrl}/media/latest/media/${page}`;
      console.log('latestMedia:' + this.http.get(url));
      return this.http.get(url);
    }

    getBestRatedMedia(page: number): Observable<any> {
      const url = `${this.backendUrl}/media/bestRated/media/${page}`;
      return this.http.get(url);
    }

    getUpcomingMedia(page: number): Observable<any> {
      const url = `${this.backendUrl}/media/upcoming/media/${page}`;
      return this.http.get(url);
    }

    getWatchlist(page: number): Observable<any> {
      const url = `${this.backendUrl}/watchlists/${page}`;
      const token = this.getStoredToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` || '');
      return this.http.get<any>(url, { headers, observe: 'response' });
    }

    createWatchlist(mediaId: number): Observable<HttpResponse<any>> {
      console.log("mediaId createdWatchlist: " + mediaId);
      const url = `${this.backendUrl}/watchlists/${mediaId}`;
      const token = this.getStoredToken();
      console.log("token createWatchlist: " + token);
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` || '');
      return this.http.post<any>(url, null, { headers, observe: 'response' });
    }
    

    deleteWatchlist(mediaId: number): Observable<any> {
      const url = `${this.backendUrl}/watchlists/${mediaId}`;
      const token = this.getStoredToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` || '');
      return this.http.delete<any>(url, { headers, observe: 'response' });
    }

}
