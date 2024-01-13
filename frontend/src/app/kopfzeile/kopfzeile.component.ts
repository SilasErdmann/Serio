import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UsernameService } from '../username.service';


@Component({
  selector: 'app-kopfzeile',
  templateUrl: './kopfzeile.component.html',
  styleUrls: ['./kopfzeile.component.scss']
})
export class KopfzeileComponent implements OnInit, OnDestroy {
  @Input() currentRoute: string | undefined;

  term: string = '';
  isDropdownOpen = false;
  isUsernameDropdownOpen = false;
  username: string | null = null;
  private usernameSubscription: Subscription | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private dataService: DataService, private router: Router, private usernameService: UsernameService) {}

  ngOnInit() {
    this.usernameSubscription = this.usernameService.username$.subscribe((username: string | null) => {
      this.username = username;
      interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.checkUsernameUpdate();

      });
    });
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.checkUsernameUpdate();
      });
  }

  saveAndOutputSearchInput() {
    this.term = (document.querySelector('.search-input') as HTMLInputElement).value;
    this.router.navigate(['/kopfzeile', this.term]);
  }

  ngOnDestroy() {
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkUsernameUpdate() {
    const updatedUsername = this.dataService.getUsername();
    if (updatedUsername !== this.username) {
      this.username = updatedUsername;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openDropdown() {
    this.isDropdownOpen = true;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  openUsernameDropdown() {
    this.isUsernameDropdownOpen = true;
  }

  closeUsernameDropdown() {
    this.isUsernameDropdownOpen = false;
  }

  handleSearchInputEnter() {
    this.saveAndOutputSearchInput();
  }

 /* saveAndOutputSearchInput() {
    const searchInput = (document.querySelector('.search-input') as HTMLInputElement).value;
    console.log('Sucheingabe:', searchInput);
    (document.querySelector('.search-input') as HTMLInputElement).value = '';
  }*/

  logout() {
    this.dataService.logout();
    this.router.navigate(['/login']); // Navigiere zur Login-Seite nach dem Ausloggen
  }
}
