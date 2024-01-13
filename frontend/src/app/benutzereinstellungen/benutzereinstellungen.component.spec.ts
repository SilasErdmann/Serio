import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenutzereinstellungenComponent } from './benutzereinstellungen.component';

describe('BenutzereinstellungenComponent', () => {
  let component: BenutzereinstellungenComponent;
  let fixture: ComponentFixture<BenutzereinstellungenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BenutzereinstellungenComponent]
    });
    fixture = TestBed.createComponent(BenutzereinstellungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
