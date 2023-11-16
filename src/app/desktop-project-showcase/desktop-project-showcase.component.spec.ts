import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopProjectShowcaseComponent } from './desktop-project-showcase.component';

describe('DesktopProjectShowcaseComponent', () => {
  let component: DesktopProjectShowcaseComponent;
  let fixture: ComponentFixture<DesktopProjectShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopProjectShowcaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopProjectShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
