import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLoadComponent } from './form-load.component';

describe('FormLoadComponent', () => {
  let component: FormLoadComponent;
  let fixture: ComponentFixture<FormLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
