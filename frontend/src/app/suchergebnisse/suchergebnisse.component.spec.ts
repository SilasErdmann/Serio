import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuchergebnisseComponent } from './suchergebnisse.component';

describe('SuchergebnisseComponent', () => {
  let component: SuchergebnisseComponent;
  let fixture: ComponentFixture<SuchergebnisseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuchergebnisseComponent]
    });
    fixture = TestBed.createComponent(SuchergebnisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
