import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreseiteComponent } from './genreseite.component';

describe('GenreseiteComponent', () => {
  let component: GenreseiteComponent;
  let fixture: ComponentFixture<GenreseiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenreseiteComponent]
    });
    fixture = TestBed.createComponent(GenreseiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
