import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileForLoadComponent } from './file-for-load.component';

describe('FileForLoadComponent', () => {
  let component: FileForLoadComponent;
  let fixture: ComponentFixture<FileForLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileForLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileForLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
