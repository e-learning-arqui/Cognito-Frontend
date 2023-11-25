import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakenCoursesListComponent } from './taken-courses-list.component';

describe('TakenCoursesListComponent', () => {
  let component: TakenCoursesListComponent;
  let fixture: ComponentFixture<TakenCoursesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TakenCoursesListComponent]
    });
    fixture = TestBed.createComponent(TakenCoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
