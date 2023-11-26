import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStreamComponent } from './view-stream.component';

describe('ViewStreamComponent', () => {
  let component: ViewStreamComponent;
  let fixture: ComponentFixture<ViewStreamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStreamComponent]
    });
    fixture = TestBed.createComponent(ViewStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
