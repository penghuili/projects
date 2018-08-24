import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeSliderComponent } from './knowledge-slider.component';

describe('KnowledgeSliderComponent', () => {
  let component: KnowledgeSliderComponent;
  let fixture: ComponentFixture<KnowledgeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
