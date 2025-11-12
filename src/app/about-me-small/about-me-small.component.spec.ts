import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeSmallComponent } from './about-me-small.component';

describe('AboutMeSmallComponent', () => {
  let component: AboutMeSmallComponent;
  let fixture: ComponentFixture<AboutMeSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMeSmallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMeSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
