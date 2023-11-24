import {Component, inject} from '@angular/core';
import {MenuItem, TreeNode} from "primeng/api";
import {ClassDto} from "../../../model/dto/ClassDto";
import {LevelDto} from "../../../model/dto/LevelDto";
import {CategoryDto} from "../../../model/dto/CategoryDto";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../../services/course.service";
import {SectionDto} from "../../../model/dto/SectionDto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {ClassService} from "../../../services/class.service";

interface Column{
  field: string;
  header: string;
}

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.css']
})



export class SectionFormComponent {
  private catService: CategoryService = inject(CategoryService);
  private courseService : CourseService = inject(CourseService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private classService: ClassService = inject(ClassService);
  private router : Router = inject(Router);


  sections!: TreeNode<any>[];
  cols!: Column[];
  subscription!: Subscription;


  private route: ActivatedRoute = inject(ActivatedRoute);
  newSectionForm!: FormGroup;
  dialogVisible: boolean = false;

  classes: ClassDto[] = [];


  file: File | undefined;


  constructor() {
    this.newSectionForm = this.formBuilder.group({
      title: [''],
      description: [''],
    });

    this.classService.setSectionUrl(this.route.snapshot.params['id']);

    this.findClassesByCourseId(this.route.snapshot.params['id'])
  }

  ngOnInit(){

    let id = -1;

    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.courseService.findSectionsById(id).subscribe(
      data => {
        // @ts-ignore
        this.sections = data.response!.map((section: SectionDto) => {
          return {
            key: section.sectionId,
            label: section.title,
            data: section,
            children:[

              {key: `${section.sectionId}-1`, label: 'Hola', data: 'Hola', children: []},

            ]

          };
        });

      }
    );
    this.cols = [
      {field: 'title', header: 'Título'},
      {field: 'description', header: 'Descripción'},

    ]
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showNewSectionDialog() {
    this.dialogVisible = true;
  }

  saveSection() {
    //convert form data to SectionDto
    const courseId = this.route.snapshot.params['id'];
    const newSection: SectionDto = {

      courseId: courseId,
      title: this.newSectionForm.controls['title'].value,
      description: this.newSectionForm.controls['description'].value,
      status: true
    }
    this.courseService.saveSection(newSection, courseId);
  }

  deleteSection(sectionId: number) {
     this.courseService.deleteSection(sectionId);
  }

  onChanges(event: Event): void {

    // @ts-ignore
    this.file = (event.target as HTMLInputElement).files[0];


  }
  onVideoUpload(): void {
    this.courseService.uploadClassVideo(this.file!,1).subscribe((response) => {
      console.log(response);
    });
  }

  addVideo(sectionId: number){
    const courseId = this.route.snapshot.params['id'];
    this.classService.setSectionUrl(sectionId);

    this.router.navigate([`courses/${courseId}/sections/${sectionId}/class-form`]);
    console.log(sectionId);
  }

  findClassesByCourseId(courseId: number){
    this.courseService.findClassesByCourseId(this.route.snapshot.params['id']).subscribe(
      data => {
        this.classes = data.response;
      }
    )
  }

  goToclassList(sectionId: number){
    this.classService.setSectionUrl(sectionId);
    this.router.navigate([`courses/${this.route.snapshot.params['id']}/sections/${sectionId}/classes`]);
  }

}



