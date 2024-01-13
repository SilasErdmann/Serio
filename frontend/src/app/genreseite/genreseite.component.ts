import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-genreseite',
  templateUrl: './genreseite.component.html',
  styleUrls: ['./genreseite.component.scss']
})
export class GenreseiteComponent {
  constructor(private router: Router, private titleService: Title) {}

  ngOnInit() {
    const newTitle = 'Genres'; // Hier kannst du den Namen des Tabs anpassen
    this.titleService.setTitle('Serio - ' + newTitle);
  }

  navigateToGenre(id: number) {
    this.router.navigate(['/gewaeltesgenre', id]);
  }
}
