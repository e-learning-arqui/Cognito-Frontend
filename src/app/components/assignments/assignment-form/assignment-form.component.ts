  import { Component, inject } from '@angular/core';
  import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { AssignmentTypeDto } from 'src/app/model/dto/AssignmentTypeDto';
  import { SectionDto } from 'src/app/model/dto/SectionDto';
  import { AssignmentService } from 'src/app/services/assignment.service';
  import { CourseService } from 'src/app/services/course.service';

  @Component({
    selector: 'app-assignment-form',
    templateUrl: './assignment-form.component.html',
    styleUrls: ['./assignment-form.component.css']
  })
  export class AssignmentFormComponent {
    assignmentForm: FormGroup;
    visibleQuestions: { [key: number]: boolean } = {};
    assignmentTypes: AssignmentTypeDto[] | undefined;
    sections: SectionDto[] | undefined;

    assignmentService: AssignmentService = inject(AssignmentService);
    courseService: CourseService = inject(CourseService);
    private route: ActivatedRoute = inject(ActivatedRoute);


    constructor(private fb: FormBuilder, private router: Router) {
      this.assignmentForm = this.fb.group({
        title: [''],
        assignmentTypeId: [1],
        sectionId: [1],
        courseId: [+this.route.snapshot.params['id']],
        questions: this.fb.array([])
      });
    }


    get questions() {
      return this.assignmentForm.get('questions') as FormArray;
    }


    onSubmit() {
      console.log(this.assignmentForm.value);
      if (this.assignmentForm.valid) {
        this.assignmentService.createAssignment(this.assignmentForm.value)
          .subscribe({
            next: (response: any) => {
              console.log('Assignment creado con éxito', response);
              this.router.navigate(['/']);


            },
            error: (error: any) => {
              console.error('Hubo un error al crear el Assignment', error);
            }
          });


      }
    }
  }
