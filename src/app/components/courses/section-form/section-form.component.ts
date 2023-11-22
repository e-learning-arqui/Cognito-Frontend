import {Component, inject} from '@angular/core';
import {MenuItem, TreeNode} from "primeng/api";
import {UserDto} from "../../../model/dto/UserDto";
import {LevelDto} from "../../../model/dto/LevelDto";
import {CategoryDto} from "../../../model/dto/CategoryDto";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute} from "@angular/router";
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
  sections!: TreeNode<SectionDto>[];
  cols!: Column[];
  items!: MenuItem[];
  subscription!: Subscription;


  private route: ActivatedRoute = inject(ActivatedRoute);
  newSectionForm!: FormGroup;
  newClassForm!: FormGroup;
  dialogVisible: boolean = false;
  videoDialog: boolean = false;



  file: File | undefined;
  classTitle: string = '';
  classDesc: string = '';

  constructor() {
    this.newSectionForm = this.formBuilder.group({
      title: [''],
      description: [''],
    });
    this.newClassForm = this.formBuilder.group({
      classTitle: [''],
      classDesc: [''],
      duration: [''],
    });
    this.classService.setSectionUrl(this.route.snapshot.params['id']);

  }

  ngOnInit(){
    this.items = [
      {
        label: 'Agregar Clase',
        routerLink: 'add-class'
      },
      {
        label: 'Añadir Video',
        routerLink: 'video/:id'
      },


    ];

    let id = -1;

    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.courseService.findAllSections().subscribe(
      data => {
        this.sections = data.response!.map((section: SectionDto) => {
          console.log(section);
          return {
            label: section.title,
            data: section,
            children: []
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

}



