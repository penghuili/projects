import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievedCreateComponent } from './achieved-create.component';

describe('AchievedCreateComponent', () => {
  let component: AchievedCreateComponent;
  let fixture: ComponentFixture<AchievedCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievedCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievedCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
