import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  email: string = '';
  showRegistration: boolean = false;
  errorMessages = {
    username: '',
    password: '',
    email: ''
  };

  public loginForm: FormGroup = new FormGroup({});
  public registrationForm: FormGroup = new FormGroup({});

  constructor(private dataService: DataService, private formBuilder: FormBuilder, private router: Router, private titleService: Title) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.loginForm.valueChanges.subscribe(data => {
      console.log(data);
    });

    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });

    this.registrationForm.valueChanges.subscribe(data => {
      console.log(data);
    });

  }

  ngOnInit() {
    const newTitle = 'Login'; // Hier kannst du den Namen des Tabs anpassen
    this.titleService.setTitle('Serio - ' + newTitle);
  }

  login(event: any): void {
    this.dataService.login(this.loginForm.value).subscribe((response: any) => {
      console.log('Serverantwort:', response);

      if (response.statusCode === 200) {
        console.log('Login erfolgreich');

        this.router.navigate(['/hauptseite']);
      } else {
        console.log('Fehler beim Login');

        this.errorMessages.username = 'Fehler beim Login';
      }
    });
  }


  register(event: any): void {
    if (this.registrationForm.valid) {
      this.dataService.createUser(this.registrationForm.value).subscribe((response: any) => {
        console.log('Serverantwort:', response);

        if (response.statusCode === 200) {
          console.log('Registrierung erfolgreich');
          window.location.reload();
        } else {
          console.log('Fehler bei der Registrierung');
          this.errorMessages.username = 'Der Username ist ungültig';

          if (response.message === 'Die E-Mail-Adresse ist ungültig.') {
            this.errorMessages.email = response.message;
          }
        }
      });
    }
  }



  showRegistrationForm(): void {
    this.showRegistration = true;
  }

  showLoginForm(): void {
    this.showRegistration = false;
  }
}
