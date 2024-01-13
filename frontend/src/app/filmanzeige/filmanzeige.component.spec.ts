import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmanzeigeComponent } from './filmanzeige.component';

describe('FilmanzeigeComponent', () => {
  let component: FilmanzeigeComponent;
  let fixture: ComponentFixture<FilmanzeigeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilmanzeigeComponent]
    });
    fixture = TestBed.createComponent(FilmanzeigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
