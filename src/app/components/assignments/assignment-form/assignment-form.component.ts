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



    constructor(private fb: FormBuilder,     private router: Router    ) {
      this.assignmentForm = this.fb.group({
        title: [''],
        assignmentTypeId: [1],
        sectionId: [1],
        courseId: [+this.route.snapshot.params['id']],
        questions: this.fb.array([])
      });
    }

    ngOnInit(): void {
      let id;
      this.getSections();
      this.getAssignmentType();
      this.route.params.subscribe(params => {
        id = params['id'];
      });
    }

    get questions() {
      return this.assignmentForm.get('questions') as FormArray;
    }

    addQuestion() {
      const questionGroup = this.fb.group({
        content: [''],
        score: [''],
        options: this.fb.array([])
      });

      this.questions.push(questionGroup);
    }

    addOption(questionIndex: number) {
      const optionGroup = this.fb.group({
        option: [''],
        isCorrect: []
      });

      (this.questions.at(questionIndex).get('options') as FormArray).push(optionGroup);
    }

  
    getOptions(question: AbstractControl): FormArray {
      return question.get('options') as FormArray;
    }
    
    onCorrectOptionChanged(questionIndex: number, selectedOptionIndex: number) {
      const questionFormArray = this.getOptions(this.questions.at(questionIndex));
      questionFormArray.controls.forEach((optionControl, index) => {
        if (index !== selectedOptionIndex) {
          const isCorrectControl = optionControl.get('isCorrect');
          if (isCorrectControl) {
            isCorrectControl.setValue(false);
          }
        }
      });
    }

    toggleQuestion(index: number): void {
      this.visibleQuestions[index] = !this.visibleQuestions[index];
    }
    
    isQuestionVisible(index: number): boolean {
      return this.visibleQuestions[index] !== false;
    }

    getAssignmentType(){
      this.assignmentService.getAssignmentType().subscribe((response)=>{
        this.assignmentTypes = response.response;
      });
    }

    getSections(){
      this.courseService.findAllSections().subscribe((response)=>{
        this.sections=response.response
      });


    }
    onAssignmentTypeChange(event: { value: { id: any; }; }) {
      // Asumiendo que event.value es el objeto seleccionado
      const selectedId = event.value ? event.value.id : null;
      this.assignmentForm.get('assignmentTypeId')?.setValue(selectedId);
    }
    
    onSectionChange(event: { value: { sectionId: any; }; }) {
      const selectedId = event.value ? event.value.sectionId : null;
      this.assignmentForm.get('sectionId')?.setValue(selectedId);
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
