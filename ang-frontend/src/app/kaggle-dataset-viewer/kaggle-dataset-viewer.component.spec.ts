import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaggleDatasetViewerComponent } from './kaggle-dataset-viewer.component';

describe('KaggleDatasetViewerComponent', () => {
  let component: KaggleDatasetViewerComponent;
  let fixture: ComponentFixture<KaggleDatasetViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaggleDatasetViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaggleDatasetViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
