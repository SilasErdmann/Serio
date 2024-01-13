import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KopfzeileComponent } from './kopfzeile.component';

describe('KopfzeileComponent', () => {
  let component: KopfzeileComponent;
  let fixture: ComponentFixture<KopfzeileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KopfzeileComponent]
    });
    fixture = TestBed.createComponent(KopfzeileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
