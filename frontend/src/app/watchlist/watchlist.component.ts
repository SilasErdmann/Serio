import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent {

  medien: { image: string, mediaId: number }[] = [];

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    const newTitle = 'Watchlist';
    this.titleService.setTitle('Serio - ' + newTitle);
    this.getWatchlist();
  }

  getWatchlist(): void {
    this.dataService.getWatchlist(1).subscribe(
      (response: any) => {
        console.log(response);
        const medienArray = response.body; // Extract the array from the 'body' property
        this.medien = medienArray.map((media: { id: any; media: { id: any; image: any; }; }) => ({
          image: media.media.image, // Make sure to access the 'image' property of the 'media' object
          mediaId: media.media.id,
        }));
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Medien:', error);
      }
    );
  }

  deleteWatchlist(mediaId: number): void {
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

}
