import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsBarComponent } from './skills-bar.component';

describe('SkillsBarComponent', () => {
  let component: SkillsBarComponent;
  let fixture: ComponentFixture<SkillsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
