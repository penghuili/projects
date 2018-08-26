import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartDateEndDatePickerComponent } from './start-date-end-date-picker.component';

describe('StartDateEndDatePickerComponent', () => {
  let component: StartDateEndDatePickerComponent;
  let fixture: ComponentFixture<StartDateEndDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartDateEndDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartDateEndDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
