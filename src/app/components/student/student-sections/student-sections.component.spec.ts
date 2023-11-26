import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSectionsComponent } from './student-sections.component';

describe('StudentSectionsComponent', () => {
  let component: StudentSectionsComponent;
  let fixture: ComponentFixture<StudentSectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentSectionsComponent]
    });
    fixture = TestBed.createComponent(StudentSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
