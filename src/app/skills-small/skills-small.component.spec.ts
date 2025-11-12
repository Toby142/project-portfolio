import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsSmallComponent } from './skills-small.component';

describe('SkillsSmallComponent', () => {
  let component: SkillsSmallComponent;
  let fixture: ComponentFixture<SkillsSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsSmallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
