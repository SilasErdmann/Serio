import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';
import { UsernameService } from '../username.service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-profile',
  templateUrl: './benutzereinstellungen.component.html',
  styleUrls: ['./benutzereinstellungen.component.scss'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateY(-120%)' })),
      ]),
    ]),
  ],
})

export class BenutzereinstellungenComponent {
  selectedOption: number | null = null;
  neuerBenutzername: string = '';
  neueEmail: string = '';
  neuesPasswort: string = '';
  updateStatus: 'success' | 'error' | null = null;
  countdown: number | null = null; // Initialize countdown to null

  constructor(private router: Router, private dataService: DataService, private toastr: ToastrService, private usernameService: UsernameService, private titleService: Title) {}

  ngOnInit() {
    const newTitle = 'Einstellungen'; // Hier kannst du den Namen des Tabs anpassen
    this.titleService.setTitle('Serio - ' + newTitle);
  }

  selectOption(option: number): void {
    this.selectedOption = option;
  }

  confirm(): void {
    if (this.selectedOption === 1) {
      this.changeBenutzername();
    } else if (this.selectedOption === 2) {
      this.changeEmail();
    } else if (this.selectedOption === 3) {
      this.changePasswort();
    } else if (this.selectedOption === 4) {
      this.deleteAccount();
      this.router.navigate(['/hauptseite']);
    }
  }

  deleteAccount(): void {
    this.dataService.deleteUserData().subscribe(
      (response: any) => {
        console.log('Profil erfolgreich gelöscht:', response);
        this.updateStatus = 'success';
        this.countdown = 5;
        const timerInterval = setInterval(() => {
          this.countdown!--; // Non-null Assertion
          if (this.countdown === 0) {
            clearInterval(timerInterval);
            this.router.navigate(['/startseite']);
          }
          this.dataService.logout();
        }, 1000);
      },
      (error: any) => {
        console.error('Fehler beim Löschen des Profils:', error);
        this.updateStatus = 'error';
      }
    );
  }

  cancelDelete(): void {
    console.log('Account deletion cancelled!');
    this.selectedOption = null;
  }

  changeBenutzername(): void {
    const neueDaten = {
      username: this.neuerBenutzername,
    };
    this.dataService.updateUserData(neueDaten).subscribe(
      (response: any) => {
        this.toastr.success('Benutzername erfolgreich aktualisiert');
        localStorage.setItem('username', neueDaten.username);
        console.log('Benutzername erfolgreich aktualisiert:', response);
        this.updateStatus = 'success';
        this.usernameService.setUsername(this.neuerBenutzername);

        // Start the countdown timer
        this.countdown = 5;
        const timerInterval = setInterval(() => {
          this.countdown!--; // Add the '!' to assert that countdown is not null
          if (this.countdown === 0) {
            clearInterval(timerInterval);
            window.location.reload();
          }
        }, 1000); // Update the countdown every 1000 milliseconds (1 second)
      },
      (error: any) => {
        this.toastr.error('Fehler beim Aktualisieren des Benutzernamens');
        console.error('Fehler beim Aktualisieren des Benutzernamens:', error);
        this.updateStatus = 'error';
      }
    );
  }

  changeEmail(): void {
    const neueDaten = {
      email: this.neueEmail,
    };
    this.dataService.updateUserData(neueDaten).subscribe(
      (response: any) => {
        console.log('E-mail erfolgreich aktualisiert:', response);
        this.updateStatus = 'success';
        this.countdown = 5;
        const timerInterval = setInterval(() => {
          this.countdown!--; // Non-null Assertion
          if (this.countdown === 0) {
            clearInterval(timerInterval);
            window.location.reload();
          }
        }, 1000);
      },
      (error: any) => {
        console.error('Fehler beim Aktualisieren der E-mail:', error);
        this.updateStatus = 'error';
      }
    );
  }

  changePasswort(): void {
    const neueDaten = {
      password: this.neuesPasswort,
    };
    this.dataService.updateUserData(neueDaten).subscribe(
      (response: any) => {
        console.log('Passwort erfolgreich aktualisiert:', response);
        this.updateStatus = 'success';
        this.countdown = 5;
        const timerInterval = setInterval(() => {
          this.countdown!--; // Non-null Assertion
          if (this.countdown === 0) {
            clearInterval(timerInterval);
            window.location.reload();
          }
        }, 1000);
      },
      (error: any) => {
        console.error('Fehler beim Aktualisieren des Passworts:', error);
        this.updateStatus = 'error';
      }
    );
  }
}
