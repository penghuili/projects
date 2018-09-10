import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaritySliderComponent } from './clarity-slider.component';

describe('ClaritySliderComponent', () => {
  let component: ClaritySliderComponent;
  let fixture: ComponentFixture<ClaritySliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaritySliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaritySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
