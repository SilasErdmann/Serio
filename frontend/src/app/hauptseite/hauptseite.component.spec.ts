import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HauptseiteComponent } from './hauptseite.component';

describe('HauptseiteComponent', () => {
  let component: HauptseiteComponent;
  let fixture: ComponentFixture<HauptseiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HauptseiteComponent]
    });
    fixture = TestBed.createComponent(HauptseiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
