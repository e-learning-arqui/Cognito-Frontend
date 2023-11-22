import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassVideoComponent } from './class-video.component';

describe('ClassVideoComponent', () => {
  let component: ClassVideoComponent;
  let fixture: ComponentFixture<ClassVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassVideoComponent]
    });
    fixture = TestBed.createComponent(ClassVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
