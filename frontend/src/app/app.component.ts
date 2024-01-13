import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'frontend';
  public currentRoute: string = '';
  public showHeader = false;
  public users: any[] = []; // Array für Benutzerdaten
  apiLoaded = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlParts = event.url.split('/');
        this.currentRoute = urlParts[urlParts.length - 1];
      }
      if (this.currentRoute) {
        this.currentRoute = this.currentRoute.charAt(0).toUpperCase() + this.currentRoute.slice(1);
        console.log('Current route:', this.currentRoute);

        // One line if statement
        this.showHeader = !(this.currentRoute === '' || this.currentRoute.includes('startseite'));
      }
    });

    /*this.getUsersFromBackend(); // Benutzerdaten vom Backend abrufen*/



  }


  isFilmanzeigePage(): boolean {
    return window.location.href.includes('/filmanzeige/');
  }

}
