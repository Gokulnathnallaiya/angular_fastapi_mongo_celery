import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetFilesComponent } from './dataset-files.component';

describe('DatasetFilesComponent', () => {
  let component: DatasetFilesComponent;
  let fixture: ComponentFixture<DatasetFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
