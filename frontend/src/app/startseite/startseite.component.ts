import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.scss']
})
export class StartseiteComponent {

  constructor(private titleService: Title) { }

  ngOnInit() {
    const newTitle = 'Startseite'; // Hier kannst du den Namen des Tabs anpassen
    this.titleService.setTitle('Serio - ' + newTitle);
    localStorage.clear();
  }
}
