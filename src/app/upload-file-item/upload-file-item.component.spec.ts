import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileItemComponent } from './upload-file-item.component';

describe('UploadFileItemComponent', () => {
  let component: UploadFileItemComponent;
  let fixture: ComponentFixture<UploadFileItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFileItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
