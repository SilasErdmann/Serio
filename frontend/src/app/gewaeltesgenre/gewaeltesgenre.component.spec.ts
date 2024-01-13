import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GewaeltesgenreComponent } from './gewaeltesgenre.component';

describe('GewaeltesgenreComponent', () => {
  let component: GewaeltesgenreComponent;
  let fixture: ComponentFixture<GewaeltesgenreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GewaeltesgenreComponent]
    });
    fixture = TestBed.createComponent(GewaeltesgenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
