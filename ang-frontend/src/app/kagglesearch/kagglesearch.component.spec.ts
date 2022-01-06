import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KagglesearchComponent } from './kagglesearch.component';

describe('KagglesearchComponent', () => {
  let component: KagglesearchComponent;
  let fixture: ComponentFixture<KagglesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KagglesearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KagglesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
