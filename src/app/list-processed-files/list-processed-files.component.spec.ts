import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcessedFilesComponent } from './list-processed-files.component';

describe('ListProcessedFilesComponent', () => {
  let component: ListProcessedFilesComponent;
  let fixture: ComponentFixture<ListProcessedFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProcessedFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProcessedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
